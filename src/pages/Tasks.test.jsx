import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("../lib/supabase", () => {
  const mockTasks = [
    {
      id: "1",
      user_id: "user-1",
      title: "Dog walking",
      due_date: null,
      priority: "Low",
      is_completed: false,
      created_at: "2026-06-22T10:00:00",
    },
    {
      id: "2",
      user_id: "user-1",
      title: "Finish project",
      due_date: "2026-06-23T09:00:00",
      priority: "High",
      is_completed: true,
      created_at: "2026-06-22T11:00:00",
    },
  ];

  const query = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    order: vi.fn().mockResolvedValue({
      data: mockTasks,
      error: null,
    }),
  };

  return {
    supabase: {
      auth: {
        getUser: vi.fn().mockResolvedValue({
          data: {
            user: {
              id: "user-1",
            },
          },
        }),
      },
      from: vi.fn(() => query),
    },
  };
});

import Tasks from "./Tasks";

describe("Tasks Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("renders tasks fetched from Supabase", async () => {
    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>,
    );

    expect(screen.getAllByText("All Tasks")[0]).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText("Dog walking")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Finish project")[0]).toBeInTheDocument();
    });

    expect(screen.getByText("All 2")).toBeInTheDocument();
    expect(screen.getByText("Active 1")).toBeInTheDocument();
    expect(screen.getByText("Done 1")).toBeInTheDocument();
  });

  test("filters completed tasks", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByText("Dog walking")[0]).toBeInTheDocument();
    });

    await user.click(screen.getByText("Done 1"));

    expect(screen.queryByText("Dog walking")).not.toBeInTheDocument();
    expect(screen.getAllByText("Finish project")[0]).toBeInTheDocument();
  });

  test("searches tasks by title", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Tasks />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getAllByText("Dog walking")[0]).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText("Search tasks..."), "project");

    expect(screen.queryByText("Dog walking")).not.toBeInTheDocument();
    expect(screen.getAllByText("Finish project")[0]).toBeInTheDocument();
  });
});
