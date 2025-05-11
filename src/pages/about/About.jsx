import useAboutData from "../../hooks/useAboutData";

const About = () => {
  const [aboutData, refetch] = useAboutData();

  return (
    <div className="pt-28 lg:pt-40 pb-10 min-h-[65vh]">
      <div className="container mx-auto px-4">
        <div
          dangerouslySetInnerHTML={{ __html: aboutData?.about }}
          className=""
        />
      </div>
    </div>
  );
};

export default About;
