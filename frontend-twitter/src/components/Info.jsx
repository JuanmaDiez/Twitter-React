import "../modules/info.modules.css";

function Info() {
  return (
    <div className="d-none d-md-flex d-lg-flex flex-column col-3">
      <div className="d-flex flex-column container information-containers mt-4 p-4">
        <h6>What's happening</h6>
        <div>
          <small>Programming-Trending</small>
          <p>#MongoVsSequelize</p>
          <small>97.5K tweets</small>
        </div>
        <div>
          <small>Entertainment-Trending</small>
          <p>#StarWars</p>
          <small>97.5K tweets</small>
        </div>
        <div>
          <small>News-Trending</small>
          <p>#LifeInMars</p>
          <small>97.5K tweets</small>
        </div>
      </div>
      <div className="container information-containers mt-4 p-4">
        <h6>Who to follow?</h6>
        <div className="d-flex justify-content-between mb-2">
          <img src="profile.svg" alt="Pic" />
          <div className="mx-3">
            <div>HackAcademy</div>
            <small>@HackAcademyDev</small>
          </div>
          <div className="d-flex align-items-center">
            <button className="follow-button m-2">Follow</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <img src="profile.svg" alt="Pic" />
          <div className="mx-3">
            <div>JavaScript</div>
            <small>@JavaScript</small>
          </div>
          <div className="d-flex align-items-center">
            <button className="follow-button m-2">Follow</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <img src="profile.svg" alt="Pic" />
          <div className="mx-3">
            <div>MongoDB</div>
            <small>@MongoDB</small>
          </div>

          <div className="d-flex align-items-center">
            <button className="follow-button m-2">Follow</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <img src="profile.svg" alt="Pic" />
          <div className="mx-3">
            <div>Node.js</div>
            <small>@nodejs</small>
          </div>
          <div className="d-flex align-items-center">
            <button className="follow-button m-2">Follow</button>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <img src="profile.svg" alt="Pic" />
          <div className="mx-3">
            <div>MDN Web Docs</div>
            <small>@MozDevNet</small>
          </div>
          <div className="d-flex align-items-center">
            <button className="follow-button m-2">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
