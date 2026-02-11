const Title = ({
  styleTitle,
  styleSubTitle,
  title,
  subTitle,
}: {
  styleTitle?: string;
  styleSubTitle?: string;
  title: string;
  subTitle?: string;
}) => {
  return (
    <>
      <h1
        className={`text-xl md:text-2xl font-semibold text-center capitalize ${styleTitle}`}
      >
        {title}
      </h1>
      <p className={`${styleSubTitle} text-center`}>{subTitle}</p>
    </>
  );
};

export default Title;
