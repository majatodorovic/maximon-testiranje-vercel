import Image from "next/image";
import { notFound, useParams } from "next/navigation";

const StaticPage = ({ data }) => {
  const staticData = data?.items?.map((item) => {
    return item;
  });

  const keyGenerator = (prefix) => {
    return `${prefix}-${Math.random().toString(36)}`;
  };

  return (
    <div className={`mt-10`}>
      {staticData?.map((item) => {
        switch (item?.type) {
          case "multiple_images":
            return (
              <div
                key={keyGenerator("multiple_images")}
                className={`w-[90%] !max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4`}
              >
                {item?.content?.map((image) => {
                  return (
                    <div
                      key={keyGenerator("image")}
                      className={`flex justify-center col-span-1 relative `}
                    >
                      <div
                        className={`max-sm:h-[280px] sm:h-[300px] lg:h-[450px] 2xl:h-[500px]`}
                      >
                        <Image
                          src={image?.file}
                          alt={``}
                          fill
                          sizes="100vw"
                          priority
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );

            break;

          case "html_editor":
            return (
              <div
                key={keyGenerator("html")}
                className={`w-[90%] mx-auto prose !max-w-full`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></div>
            );

            break;

          case "textarea":
            return (
              <div
                key={keyGenerator("textarea")}
                className={`w-[90%] mx-auto prose !max-w-full`}
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></div>
            );

            break;
        }
      })}
    </div>
  );
};

export default StaticPage;
