import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error(profileError);
      setMessage(profileError.message);
      return;
    }

    setProfile(profileData);
    setFullName(profileData.full_name || "");

    const { data: tasksData, error: tasksError } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);

    if (tasksError) {
      console.error(tasksError);
      setMessage(tasksError.message);
      return;
    }

    setTasks(tasksData || []);
  };

  const showTemporaryMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];

    if (!file || !user) return;

    setMessage("");
    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      setMessage(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const publicUrl = `${data.publicUrl}?updated=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        profile_image: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      setMessage(updateError.message);
      setUploading(false);
      return;
    }

    setProfile((currentProfile) => ({
      ...currentProfile,
      profile_image: publicUrl,
    }));

    setUploading(false);
    showTemporaryMessage("Profile image updated successfully.");
  };

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfile((currentProfile) => ({
      ...currentProfile,
      full_name: fullName,
    }));

    setIsEditingName(false);
    showTemporaryMessage("Profile updated successfully.");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    navigate("/login");
  };

  const completedTasks = tasks.filter((task) => task.is_completed);
  const activeTasks = tasks.filter((task) => !task.is_completed);

  const now = new Date();

  const completedThisMonth = completedTasks.filter((task) => {
    if (!task.updated_at) return false;

    const updatedDate = new Date(task.updated_at);

    return (
      updatedDate.getMonth() === now.getMonth() &&
      updatedDate.getFullYear() === now.getFullYear()
    );
  });

  const overdueTasks = tasks.filter((task) => {
    if (!task.due_date || task.is_completed) return false;

    return new Date(task.due_date) < now;
  });

  const weeklyTasks = tasks.filter((task) => {
    const createdDate = new Date(task.created_at);
    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(now.getDate() - 7);

    return createdDate >= sevenDaysAgo;
  });

  const weeklyCompletedTasks = weeklyTasks.filter((task) => task.is_completed);

  const weeklyProgress =
    weeklyTasks.length > 0
      ? Math.round((weeklyCompletedTasks.length / weeklyTasks.length) * 100)
      : 0;

  if (!user || !profile) {
    return (
      <main className="profile-page">
        <section className="profile-shell">
          <p className="auth-message">Loading profile...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <header className="profile-header">
          <div className="brand-row">
            <div className="avatar">
              {profile.profile_image ? (
                <img src={profile.profile_image} alt="Profile" />
              ) : (
                "👩🏻"
              )}
            </div>

            <p className="today-brand">Taskly</p>
          </div>
        </header>

        <section className="profile-hero">
          <div className="profile-photo">
            {profile.profile_image ? (
              <img src={profile.profile_image} alt="Profile" />
            ) : (
              profile.full_name?.charAt(0).toUpperCase() || "U"
            )}

            <button type="button" onClick={handleAvatarClick}>
              ✎
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
          </div>

          {isEditingName ? (
            <div className="profile-edit-name">
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />

              <button type="button" onClick={handleSaveProfile}>
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setFullName(profile.full_name || "");
                  setIsEditingName(false);
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <h1>{profile.full_name}</h1>
              <p>{user.email}</p>
            </>
          )}

          {uploading && <p className="auth-message">Uploading image...</p>}
          {message && <p className="success-message">{message}</p>}
        </section>

        <section className="weekly-card">
          <div className="weekly-top">
            <h2>Weekly Progress</h2>
            <span>{weeklyProgress}% Done</span>
          </div>

          <div className="weekly-bar">
            <span style={{ width: `${weeklyProgress}%` }}></span>
          </div>

          <div className="weekly-meta">
            <p>{completedTasks.length} Tasks Completed</p>
            <p>{overdueTasks.length} Overdue</p>
          </div>
        </section>

        <section className="profile-stats">
          <div className="stat-card">
            <span>✓</span>
            <h3>{completedThisMonth.length}</h3>
            <p>THIS MONTH</p>
          </div>

          <div className="stat-card blue">
            <span>ϟ</span>
            <h3>{activeTasks.length}</h3>
            <p>ACTIVE TASKS</p>
          </div>
        </section>

        <section className="profile-actions">
          <button
            className="edit-profile-btn"
            type="button"
            onClick={() => setIsEditingName(true)}
          >
            ✍ Edit Profile <span>›</span>
          </button>

          <button
            className="preferences-btn"
            type="button"
            onClick={() => navigate("/settings")}
          >
            ⚙ Preferences <span>›</span>
          </button>

          <button className="logout-btn" type="button" onClick={handleLogout}>
            ↪ Logout
          </button>
        </section>

        <Footer />
      </section>
    </main>
  );
}

export default Profile;
