"use client"
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function Home() {
  const [insurancePolicy, setInsurancePolicy] = useState<File>();
  const [driverLicense, setDriverLicense] = useState<File>();
  const [registrationCertificate, setRegistrationCertificate] = useState<File>();
  const [fir, setFIR] = useState<File>();
  const [damagesEstimate, setDamagesEstimate] = useState<File>();
  const [medicalReport, setMedicalReport] = useState<File>();
  const [otherExpenses, setOtherExpenses] = useState<File>();
  const [photographs, setPhotographs] = useState<FileList | null>();
  const [recipe, setRecipe] = useState('');
  const [time, setTime] = useState('');
  
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!insurancePolicy || !driverLicense || !registrationCertificate || !fir || !damagesEstimate || !otherExpenses) return;
    try {
      const data = new FormData();
      data.append('insurancePolicy', insurancePolicy);
      data.append('driverLicense', driverLicense);
      data.append('registrationCertificate', registrationCertificate);
      data.append('fir', fir);
      data.append('damagesEstimate', damagesEstimate);
      data.append('medicalReport', medicalReport || '');
      data.append('otherExpenses', otherExpenses);
      if (photographs) {
        for (let i = 0; i < photographs.length; i++) {
          data.append('photographs', photographs[i]);
        }
      }
      data.append('time', time);
      
      const res = await fetch('api/claim', {
        method: 'POST',
        body: data,
      });
      
      const temp = await res.json();
      setRecipe(temp);
      
      if (!res.ok) throw new Error(await res.text());
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='p-2 sm:p-5'>
    <form onSubmit={submit} className='ring-2 ring-white p-3 sm:p-10 rounded-sm flex flex-col gap-6'>
      {/* Copy of car insurance policy */}
      <Label htmlFor='insurancePolicy' className='text-lg'>Copy of Your Car Insurance Policy</Label>
      <input
        id='insurancePolicy'
        name='insurancePolicy'
        type='file'
        onChange={(e) => setInsurancePolicy(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* Copy of driver's license */}
      <Label htmlFor='driverLicense' className='text-lg'>Copy of Your Driver’s License</Label>
      <input
        id='driverLicense'
        name='driverLicense'
        type='file'
        onChange={(e) => setDriverLicense(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* Copy of car's registration certificate */}
      <Label htmlFor='registrationCertificate' className='text-lg'>Copy of Your Car’s Registration Certificate</Label>
      <input
        id='registrationCertificate'
        name='registrationCertificate'
        type='file'
        onChange={(e) => setRegistrationCertificate(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* First Information Report (FIR) */}
      <Label htmlFor='fir' className='text-lg'>First Information Report (FIR)</Label>
      <input
        id='fir'
        name='fir'
        type='file'
        onChange={(e) => setFIR(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* Estimate of damages and repairs */}
      <Label htmlFor='damagesEstimate' className='text-lg'>Estimate of Damages and Repairs</Label>
      <input
        id='damagesEstimate'
        name='damagesEstimate'
        type='file'
        onChange={(e) => setDamagesEstimate(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* Medical report (only in case of physical injuries) */}
      <Label htmlFor='medicalReport' className='text-lg'>Medical Report (If Applicable)</Label>
      <input
        id='medicalReport'
        name='medicalReport'
        type='file'
        onChange={(e) => setMedicalReport(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* Records of other expenses */}
      <Label htmlFor='otherExpenses' className='text-lg'>Records of Other Expenses</Label>
      <input
        id='otherExpenses'
        name='otherExpenses'
        type='file'
        onChange={(e) => setOtherExpenses(e.target.files?.[0])}
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='.pdf, .jpg, .png'
      />
  
      {/* Photographs */}
      <Label htmlFor='photographs' className='text-lg'>Photographs (If Available)</Label>
      <input
        id='photographs'
        name='photographs'
        type='file'
        onChange={(e) => setPhotographs(e.target.files)}
        multiple
        className='h-[40px] max-h-fit w-full p-4 border border-gray-300 rounded-lg mt-2 resize-none focus:outline-none focus:ring focus:border-green-500'
        accept='image/*'
      />
  
      {/* Submit button */}
      <input type="submit" value="Submit Claim" className="bg-white text-black hover:font-bold hover:bg-green-500 rounded-md px-4 py-2 hover:text-white mt-2 inline-block" />
    </form>
  </main>
  
  );
}
