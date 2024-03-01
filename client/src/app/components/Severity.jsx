import { severe } from "../../../public/constants";
import Delete from "@/app/components/Delete";

const Severity = () => {
  return (
      <div className='bg-white rounded-xl mx-5 pt-5 pb-5 flex items-center justify-around'>
        <div>
          {severe.map((item, index) => (
            <div key={index} className="desc flex items-center m-24 mt-9 mb-9 gap-x-10">
              <div className={`w - 16 color px-14 py-4 rounded-full ${item.color}`}></div>
              <div className={`${item.color}Desc font-light font-outfit`}>{item.desc}</div>
            </div>
          ))}
        </div>
          <div>
              <Delete />
          </div>
      </div>
  );
};

export default Severity;
