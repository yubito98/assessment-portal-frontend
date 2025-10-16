import "./CandidateOverview.scss";
import graphic from "../../assets/images/report.png";

function CandidateOverview() {
  return (
    <section className="candidate-overview">
      <div className="container-standar">
        <div className="row">
          <div className="column description">
            <h4>Description:</h4>
            <p>
              freestar Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non mattis eros, vel elementum nulla. Nam eget nibh at diam porta lacinia a in metus. Mauris cursus enim quam, et viverra ante tincidunt vel. Proin lorem neque, fringilla id sapien sit amet, ornare faucibus nunc.
              Donec in quam neque. Nunc et nulla metus. Donec accumsan sed dui ut efficitur. Pellentesque nec tellus id justo sodales consectetur.
            </p>
          </div>
          <div className="column">
            <div className="graphic">
              <img src={graphic} />
            </div>
          </div>
          <div className="column">
            <div className="stats">stats</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CandidateOverview;
