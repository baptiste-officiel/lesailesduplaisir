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

type CalendarType = {
  activity: string;
  withPilot: string;
  startDate: Date | null;
  endDate: Date | null;
}

const CalendarPicker = () => {

  const activityValues = [
    {
      activity: 'location',
      label: 'Location'
    },
    {
      activity: 'formation',
      label: 'Formation Glass Copkpit'
    },
  ]

  const withPilot = [
    {
      choice: 'avec',
      label: 'Avec'
    },
    {
      choice: 'sans',
      label: 'Sans'
    },
  ]


  // let endDisabledDate = addDays(new Date(), 4);
  // console.log("🚀 ~ DatePickerReact ~ endDisabledDate:", endDisabledDate)

    // const [startDate, setStartDate] = useState<Date | null>(new Date());
    // console.log("🚀 ~ DatePickerReact ~ startDate:", startDate)
    // const [endDate, setEndDate] = useState<Date | null>(null);
    // console.log("🚀 ~ DatePickerReact ~ endDate:", endDate)
    
    const [data, setData] = useState<CalendarType>({
      activity: '',
      withPilot: '',
      startDate: null,
      endDate: null
    });
    
    // const handleChange = (date: any) => {
    //   console.log("🚀 ~ handleChange ~ date:", date)
    //   // setStartDate(date);
    //   // setEndDate(null)
    //   setData({...data, startDate: date})
    //   setData({...data, endDate: null})
    // }
    
    // Disable past time before currentDate 
    const filterPassedTimeStart = (time: any) => {
      const currentDate = new Date();
      const selectedDate = new Date(time);
      
      return currentDate!.getTime() < selectedDate.getTime();
    };
    
    // Disable past time before Start Date 
    const filterPassedTime = (time: any) => {
      const startDate = data.startDate;
      const selectedDate = new Date(time);
      
      if (startDate) {
        return data.startDate!.getTime() < selectedDate.getTime();
      }
    };
    
    console.log("🚀 ~ CalendarPicker ~ data:", data)

    // Gérer l'erreur qui permet à un user de sélectionner une date sans sélectionner d'heure 
    // (date) => setData(date!.getHours() < 9 ? {...data, startDate: null, endDate: null} : {...data, startDate: date, endDate: null}) 

  return (
    <section className='w-full'>
      <div className='border w-[calc(100%-2rem)] mx-auto my-6 py-6 rounded-2xl shadow-sm md:border-none md:shadow-none'>
        <h5 className='text-center mb-4'>Que souhaitez-vous faire ?</h5>
          <div className='flex justify-center gap-12'>
            {activityValues.map((activity) =>
                  <FormInput
                    key={activity.activity}
                    labelHtmlFor={activity.activity}
                    labelContent={activity.label}
                    id={activity.activity}
                    name="activity"
                    type="radio"
                    autoComplete="activity"
                    required
                    className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                    value={data.activity}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, activity: activity.activity})}
                    />
                )}
          </div>
      </div>

      {data.activity && 
        <div className='border w-[calc(100%-2rem)] mx-auto my-6 py-6 rounded-2xl shadow-sm md:border-none md:shadow-none'>
          <h5 className='text-center'>Avec ou sans pilote ?</h5>
            <p className='text-center text-sm font-extralight'>Vous pouvez choisir de voler en autonomie ou d&apos;être accompagné par notre pilote</p>
              <div className='flex justify-center gap-12 mt-6'>
                {withPilot.map((choice) =>
                      <FormInput
                        key={choice.choice}
                        labelHtmlFor={choice.choice}
                        labelContent={choice.label}
                        id={choice.choice}
                        name="choice"
                        type="radio"
                        autoComplete="choice"
                        required
                        className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6"
                        value={data.withPilot}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setData({...data, withPilot: choice.choice})}
                        />
                    )}
              </div>
        </div>
      }

      <div className='flex flex-col items-center gap-0 md:hidden'>
        {data.activity && data.withPilot &&
          <section className='mx-auto my-6'>
            <h6 className='text-center mb-4 font-semibold border-b-2 border-text pb-2'>Départ</h6>

                {/* onChange, si l'heure de la date sélectionnée est inférieur à 9h, on ne modifie pas le state. Ca permet d'éviter de sélectionner une date sans sélectionner d'heure. Par défaut, à la sélection d'une date, l'heure est 00:00  */}
                <DatePicker selected={data.startDate} onChange={(date) => setData({...data, startDate: date, endDate: null})} minDate={new Date()} filterTime={filterPassedTimeStart}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 18)} 
                calendarStartDay={1}
                inline showDisabledMonthNavigation showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Heure"
                dateFormat="MMMM d, yyyy h:mm aa" />
          </section>
        }
        
        {data.activity && data.withPilot && data.startDate && data.startDate.getHours() > 9 &&
          <section className='mx-auto my-6'>
            <h6 className='text-center mb-4 font-semibold border-b-2 border-text pb-2'>Retour</h6>
              <DatePicker selected={data.endDate} onChange={(date) => setData({...data, endDate: date})} minDate={data.startDate} filterTime={data.startDate ? filterPassedTime : filterPassedTimeStart}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 0), 19)}
              calendarStartDay={1}
              inline showDisabledMonthNavigation showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="Heure"
              dateFormat="MMMM d, yyyy h:mm aa" />
          </section>
        }
      </div>

        {data.activity && data.withPilot &&
      <div className='flex-wrap justify-center items-start gap-32 hidden md:flex w-[calc(100%-2rem)] mx-auto my-6 p-6'>
            <section>
              <h6 className='text-center mb-4 font-semibold border-b-2 border-text pb-2'>Départ</h6>
                <DatePicker selected={data.startDate} onChange={(date) => setData({...data, startDate: date, endDate: null})} minDate={new Date()} filterTime={filterPassedTimeStart}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 18)} 
                calendarStartDay={1}
                className="red-border"
                inline showDisabledMonthNavigation showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Heure"
                dateFormat="MMMM d, yyyy h:mm aa" />
            </section>
        
          
          {data.activity && data.withPilot && data.startDate && data.startDate.getHours() > 9 &&
            <section>
              <h6 className='text-center mb-4 font-semibold border-b-2 border-text pb-2'>Retour</h6>
                <DatePicker selected={data.endDate} onChange={(date) => setData({...data, endDate: date})} minDate={data.startDate} filterTime={filterPassedTime}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 19)}
                calendarStartDay={1}
                inline showDisabledMonthNavigation showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Heure"
                dateFormat="MMMM d, yyyy h:mm aa" />
            </section>
          }
        </div>
}
    </section>
  );

}

export default CalendarPicker
