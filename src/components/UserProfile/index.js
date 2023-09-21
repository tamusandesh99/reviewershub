import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { update_profile } from "../../actions/profile";
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
  const handleButtonClick = (webLink, username, title, tech_stack) => {
    navigate(`/posts/${encodeURIComponent(webLink)}`, {
      state: {
        username: username,
        title: title,
        tech_stack: tech_stack,
      },
    });
  };

  return (
    <>
      <div className="user-dashboard">
        {/* <div>Username: {username}</div>
        <div className="form-group">
          <ul>
            {user_posts.map((post, index) => (
              <li key={index}>
                Title: {post.title}
                <br />
                Website Link: {post.website_link}
                <br />
                Tech Stack: {post.tech_stack}
                <br />
              </li>
            ))}
          </ul>
        </div> */}

        {user_posts.map((post, index) => (
            <div
              className="single-post"
              onClick={() =>
                handleButtonClick(
                  post.website_link,
                  post.username,
                  post.title,
                  post.tech_stack
                )
              }
              key={index}
            >
              <div className="post-info">
                <p className="post-username">{post.username}</p>
                <p className="post-title">{post.title}</p>
                <p className="post-tech-stack">{post.tech_stack}</p>
              </div>
              <div className="website-preview">
                <button
                  className="preview-button"
                  onClick={() =>
                    handleButtonClick(
                      post.website_link,
                      post.username,
                      post.title,
                      post.tech_stack
                    )
                  }
                >
                  <img
                    src={post.website_link + '/favicon.ico'}
                    alt={post.title}
                  />
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  username: state.profile.username,
  user_posts_global: state.profile.user_posts,
});

export default connect(mapStateToProps)(UserProfile);
