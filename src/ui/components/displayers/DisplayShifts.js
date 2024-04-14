
import ShiftsTable from "../ShiftsTable";
import ShiftsCards from "../ShiftsCards";

const TableShifts = ({ shifts }) => {

  console.log("shifts en TableShifts ", shifts);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 md:pt-0">
          {/* MOBILE */}
         <div className="md:hidden">
              <ShiftsCards shifts={shifts}/>
         </div>

          {/* PC */}
          <div className="hidden min-w-full md:block bg-slate-1s00 rounded-lg p-1">
            <ShiftsTable shifts={shifts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableShifts;
