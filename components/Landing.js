import Heading from "./Heading";
import LandingNav from "./LandingNav";
import Footer from "./Footer";
import Features from "./Features";
const Landing = () => {
  return (
    <div className="bg-black block overflow-auto scrollbar h-screen ">
      <div
        className="bg-no-repeat bg-cover pb-10 "
        style={{ backgroundImage: "url(/bg.png)" }}
      >
        <LandingNav />
        <Heading />
      </div>
      <div className="block mb-0">
        {/* <div className="text-white text-3xl mt-10 text-center font-bold ">
          <span className="underline underline-offset-8">How it Works? </span>
          <span>🤔</span>
        </div>
        <div className="border-dashed rounded-lg w-3/4 h-96 mx-auto mt-5 border-white-600 border">
          s
        </div> */}
        <h1
          id="features"
          className="text-white text-3xl mt-20 text-center font-bold underline underline-offset-8 "
        >
          Features
        </h1>
        <Features />
      </div>
      <div className="bottom-0 mt-20 bg-slate-900  ">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
