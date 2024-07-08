'use client'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLocation } from '@/redux/features/location/locationSlice';
import PsyCard from '@/components/PsyCard';

const ProfessionalsPage = () => {
  const dispatch = useDispatch();
  const { userLocation, psychiatrists, loading, error } = useSelector(state => state.location);

  const handleLocationFetch = () => {
    dispatch(getUserLocation());
  };

  return (
    <div>
      <div className="bg-cover bg-center h-[640px] mt-6 bg-blend-multiply pt-[200px]" style={{ backgroundImage: "url('/images/psy.jpg')", backgroundColor: "rgba(0, 0, 0, 0.6)", backgroundBlendMode: "multiply" }}>
        <div className='text-[white] text-[100px] font-bold text-center w-full'>Psychiatrists near you</div>
       <div className='flex justify-center'>
       <button onClick={handleLocationFetch} disabled={loading} className='fetch'>
          {loading ? 'Fetching Details...' : 'Find pychiatrists'}
        </button>
       </div>
      </div>
      {error && <p>Error: {error}</p>}
      <div className='flex justify-center items-center pt-8'>
      {psychiatrists.length > 0 && (
        <div> 
            {psychiatrists.map((psy,index)=>{
             return  <PsyCard item={psy} key={index}/>
            })}
        </div>
      )}
      </div>
    </div>
  );
};

export default ProfessionalsPage;
