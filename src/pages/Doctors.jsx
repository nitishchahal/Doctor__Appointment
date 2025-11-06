import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [doctors, speciality]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen rounded-3xl p-8 sm:p-12 lg:p-16 mt-12">
      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-[#0F172A] text-4xl font-semibold mb-2 tracking-tight">
          Meet Our Expert Doctors
        </h2>
        <p className="text-[#475569] text-base max-w-2xl mx-auto">
          Qualified professionals from premier institutes dedicated to providing
          trusted medical care and excellence in patient service.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          "General physician",
          "Gynecologist",
          "Dermatologist",
          "Pediatricians",
          "Neurologist",
          "Gastroenterologist",
        ].map((spec, index) => (
          <button
            key={index}
            onClick={() =>
              speciality === spec
                ? navigate("/doctors")
                : navigate(`/doctors/${spec}`)
            }
            className={`px-6 py-2 border rounded-full text-sm font-medium transition-all duration-300 ${
              speciality === spec
                ? "bg-[#1E88E5] text-white border-[#1E88E5]"
                : "border-[#CBD5E1] text-[#334155] hover:bg-[#E2E8F0]"
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer"
          >
            {/* Doctor Image */}
            <div className="flex justify-center items-center h-48 bg-gradient-to-t from-[#E6EEF2] to-[#FFFFFF]">
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-sm"
              />
            </div>

            {/* Doctor Info */}
            <div className="px-6 pb-6 text-center">
              <h3 className="text-[#0F172A] text-lg font-semibold mt-3">
                {item.name}
              </h3>
              <p className="text-[#475569] text-sm mb-2">{item.speciality}</p>

              <div
                className={`inline-block px-3 py-1 text-xs rounded-full mb-3 ${
                  item.available
                    ? "bg-[#E0F2F1] text-[#0F766E]"
                    : "bg-[#F1F5F9] text-[#94A3B8]"
                }`}
              >
                {item.available ? "Available" : "Not Available"}
              </div>

              <button className="w-full text-sm font-medium text-[#1E88E5] border border-[#1E88E5] py-2 rounded-lg hover:bg-[#1E88E5] hover:text-white transition-all duration-300">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
