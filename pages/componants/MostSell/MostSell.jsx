import Image from "next/image";
import React from "react";
import model1 from "../../../public/assets/images/e4cc4d7358888b7eb0ec28535eeefead_uenlef.jpg";
import model2 from "../../../public/assets/images/Ha456f292b68b41d381920a1e94284a0cL.jpg_720x720q50_bmkbty.webp";
import model3 from "../../../public/assets/images/rainbow-baby-activity-gym_uknoag.jpg";

const MostSell = () => {
  return (
    <div className="pt-10 bg-white px-5 md:px-0">
      <h1 className="container text-2xl font-bold underline mb-2 mx-auto">
        Most Viewed{" "}
      </h1>
      <div className="container mx-auto  flex flex-wrap py-20 rounded">
        <div className="flex items-center gap-2">
          <div>
            <Image src={model1} alt="img" width={150} height={150} />
          </div>
          <div className="w-80 ">
            <h1 className="text-xl font-semibold">Women exclucive hoodies</h1>
            <p className="pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur asperiores quam tempora laborum atque
            </p>
          </div>
        </div>
        <div className="flex items-center  gap-2 mt-8 md:mt-8">
          <div>
            <Image src={model2} alt="img" width={150} height={150} />
          </div>
          <div className="w-80   ">
            <h1 className="text-xl font-semibold">Rainbow Baby Activity Gym</h1>
            <p className="pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur asperiores quam tempora laborum atque
            </p>
          </div>
        </div>
        <div className="flex items-center  gap-2 mt-8 md:mt-8">
          <div>
            <Image src={model3} alt="img" width={150} height={150} />
          </div>
          <div className="w-80  ">
            <h1 className="text-xl font-semibold">Electric soldering iron</h1>
            <p className="pt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur asperiores quam tempora laborum atque
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostSell;
