import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { update_profile } from "../../actions/profile";
import profilepicture from "../../assets/background-pictures/banner.jpg";
import "./index.scss";

const UserProfile = ({ username, user_posts_global }) => {
  // const username = useSelector(state => state.profile.username);
  // const website_link = useSelector(state => state.profile.user_website);

  const [userData, setUserData] = useState({
    user_posts: [],
  });

  const { user_posts } = userData;

  useEffect(() => {
    setUserData({
      user_posts: user_posts_global,
    });
  }, [user_posts_global]);

  let navigate = useNavigate();

  const handleButtonClick = (
    link,
    username,
    title,
    description,
    likes,
    comments,
    images,
    date
  ) => {
    console.log(username)
    
    const defaultLikes = likes !== undefined && likes !== "" ? likes : 0;
    const defaultComments =
      comments !== undefined && comments !== "" ? comments : [];
    const encodedTitle = encodeURIComponent(title).replace(/%20/g, "_");
    navigate(`/posts/${encodeURIComponent(encodedTitle)}`, {
      state: {
        username: username,
        title: title,
        description: description,
        link: link,
        likes: defaultLikes,
        comments: defaultComments,
        images: images,
        date: date,
      },
    });
  };

  return (
    <>
      <div className="user-dashboard">
        <div className="total-user-posts">
          {user_posts.map((post, index) => (
            <div
              className="single-post"
              onClick={() =>
                handleButtonClick(
                  post.username,
                  post.title,
                  post.description,
                  post.likes,
                  post.comments,
                  post.date
                )
              }
              key={index}
            >
              <div className="post-info">
                {/* <p className="post-username">{post.username}</p> */}
                <p className="post-title">{post.title}</p>
                <p className="post-description">{post.description}</p>
              </div>
              <div className="website-preview">
                <button
                  className="preview-button"
                  onClick={() =>
                    handleButtonClick(
                      post.username,
                      post.title,
                      post.description,
                      post.likes,
                      post.comments,
                      post.date
                    )
                  }
                >
                  <img
                    src={post.website_link + "/favicon.ico"}
                    alt={post.title}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="user-profile">
          <div className="user-profile-upper-container">
            <div className="image-container">
              <img src={profilepicture} />
            </div>
          </div>
          <div className="user-profile-lower-container">
            <h3>{username}</h3>
            <p>Description</p>
            <button className="user-edit-profile">Edit Profile</button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.profile.username,
  user_posts_global: state.profile.user_posts,
});

export default connect(mapStateToProps)(UserProfile);
