import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function UserAvatar() {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("profile_image")
      .eq("id", user.id)
      .single();

    setProfileImage(data?.profile_image || "");
  };

  return (
    <div className="avatar">
      {profileImage ? <img src={profileImage} alt="Profile" /> : "👩🏻"}
    </div>
  );
}

export default UserAvatar;
