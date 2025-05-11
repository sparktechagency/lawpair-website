import useDisclimerData from "../../hooks/useDisclimerData";

const Disclaimer = () => {
  const [disclimerData, refetch] = useDisclimerData();
  return (
    <div className="pt-28 lg:pt-40 pb-10 min-h-[65vh]">
      <div className="container mx-auto px-4">
        <div
          dangerouslySetInnerHTML={{ __html: disclimerData?.disclaimer }}
          className=""
        />
      </div>
    </div>
  );
};

export default Disclaimer;
