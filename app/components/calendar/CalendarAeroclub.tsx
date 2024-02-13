'use client'

import React, { useState } from 'react'
import DatePicker, { getDefaultLocale, registerLocale, setDefaultLocale } from 'react-datepicker'
import './style/datepicker.scss'
import { addDays, setHours, setMinutes } from 'date-fns';
import fr from 'date-fns/locale/fr'
import FormInput from '../inputs/FormInput';
import CalendarInput from '../inputs/CalendarInput';

registerLocale('fr', fr)
setDefaultLocale('fr');


const CalendarAeroclub = () => {

    const [ startDate, setStartDate ] = useState<Date | null>(new Date());
    
    // Disable past time before currentDate 
    const filterPassedTimeStart = (time: any) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
      
      return currentDate!.getTime() < selectedDate.getTime();
    };
    
    // Disable past time before Start Date 
    const filterPassedTime = (time: Date): boolean => {
      const selectedDate = new Date(time);
      
      if (startDate) {
        return startDate!.getTime() < selectedDate.getTime();
      }
      return false
    };
    
    console.log("🚀 ~ CalendarPicker ~ data:", startDate)

    // Gérer l'erreur qui permet à un user de sélectionner une date sans sélectionner d'heure 
    // (date) => setData(date!.getHours() < 9 ? {...data, startDate: null, endDate: null} : {...data, startDate: date, endDate: null}) 

  return (
    <section className='w-full'>
      <p className='text-center text-base px-4 my-4'>L&apos;avion est disponible en location à la semaine. Sélectionnez la semaine pendant laquelle vous voulez louer le VL3.</p>
      <div className='flex flex-col items-center gap-0 md:hidden'>
          <section className='mx-auto my-6'>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="I/R"
                // locale="fr"
                inline
                minDate={new Date()}
                showWeekNumbers
                showWeekPicker
              />
            </section>
        </div>

    </section>
  );

}

export default CalendarAeroclub
