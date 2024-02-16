'use client'

import React, { useState } from 'react'
import DatePicker, { getDefaultLocale, registerLocale, setDefaultLocale } from 'react-datepicker'
import './style/datepicker.scss'
import { addDays, setHours, setMinutes } from 'date-fns';
import fr from 'date-fns/locale/fr'
import FormInput from '../inputs/FormInput';
import CalendarInput from '../inputs/CalendarInput';
import Calendar from './Calendar';

registerLocale('fr', fr)
setDefaultLocale('fr');

type CalendarTypeAeroclub = {
  startDate: Date | null;
  endDate: Date | null;
}


const CalendarAeroclub = ({ userId }: any) => {

    // const [ startDate, setStartDate ] = useState<Date | null>(new Date());

    const [data, setData] = useState<CalendarTypeAeroclub>({
      startDate: new Date(),
      endDate: null
    });
    
    // Disable past time before currentDate 
    const filterPassedTimeStart = (time: any) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
      
      return currentDate!.getTime() < selectedDate.getTime();
    };
    
    // Disable past time before Start Date 
    const filterPassedTime = (time: Date): boolean => {
      const selectedDate = new Date(time);
      
      if (data.startDate) {
        return data.startDate!.getTime() < selectedDate.getTime();
      }
      return false
    };
    
    console.log("🚀 ~ CalendarPicker ~ data:", data)

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      const ReservationData = {
        ...data,
        userId: userId
      }
      console.log("🚀 ~ handleSubmit ~ ReservationData:", ReservationData)

      try {
        await fetch('api/reservations', {
          method: 'POST',
          body: JSON.stringify(ReservationData)
        }) 
        // const userInfo = await res.json()
      } catch (error) {
      console.log("🚀 ~ file: page.tsx:28 ~ handleSubmit ~ error:", error)
      } 
    }

  return (
    <section className='w-full'>
      <p className='text-center text-base px-4 my-4'>L&apos;avion est disponible en location à la semaine. Sélectionnez la semaine pendant laquelle vous voulez louer le VL3.</p>
      <form onSubmit={(e) => handleSubmit(e)}>
      <div className='flex flex-col items-center gap-0 md:hidden'>
          <section className='mx-auto my-6'>
            <Calendar
              selected={data.startDate}
              onChange={(date) => setData({...data, startDate: date, endDate: addDays(date, 6)})}
              dateFormat="I/R"
              inline
              minDate={new Date()}
              showWeekNumbers
              showWeekPicker
            />
          </section>
      </div>

      <div className='flex-wrap justify-center items-start gap-32 hidden md:flex w-[calc(100%-2rem)] mx-auto my-6 p-6'>
            <section>
              <Calendar
                selected={data.startDate}
                onChange={(date) => setData({...data, startDate: date, endDate: addDays(date, 6)})}
                dateFormat="I/R"
                // locale="fr"
                inline
                minDate={new Date()}
                showWeekNumbers
                showWeekPicker
              />
            </section>
        </div>
        <button type="submit" className='mt-6 bg-text text-beige block mx-auto px-8 py-2 rounded-lg hover:bg-primary-color-hover duration-300'>Réserver</button>
        </form>
    </section>
  );

}

export default CalendarAeroclub
