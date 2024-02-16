// Gérer erreur display en fonction du choix activity  


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

type CalendarType = {
  activity: string;
  withPilot: string;
  startDate: Date | null;
  endDate: Date | null;
}

const CalendarParticulier = ({userId}: any) => {

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
    
    const [data, setData] = useState<CalendarType>({
      activity: '',
      withPilot: '',
      startDate: null,
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
      const startDate = data.startDate;
      const selectedDate = new Date(time);
      
      if (startDate) {
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
    <form onSubmit={(e) => handleSubmit(e)}>
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

      {data.activity ==='location' && 
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
                {/* onChange, si l'heure de la date sélectionnée est inférieur à 9h, on ne modifie pas le state. Ca permet d'éviter de sélectionner une date sans sélectionner d'heure. Par défaut, à la sélection d'une date, l'heure est 00:00  */}
                <Calendar
                label={'Départ'}
                selected={data.startDate}
                onChange={(date) => setData({...data, startDate: date, endDate: null})}
                minDate={new Date()}
                filterTime={filterPassedTimeStart}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 18)} 
                calendarStartDay={1}
                inline
                showDisabledMonthNavigation
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Heure"
                dateFormat="MMMM d, yyyy h:mm aa" />
          </section>
        }
        
        {data.activity && data.withPilot && data.startDate && data.startDate.getHours() >= 9 &&
          <section className='mx-auto my-6'>
              <Calendar
              label={'Retour'}
              selected={data.endDate}
              onChange={(date) => setData({...data, endDate: date})}
              minDate={data.startDate}
              filterTime={data.startDate ? filterPassedTime : filterPassedTimeStart}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 0), 19)}
              calendarStartDay={1}
              inline
              showDisabledMonthNavigation
              showTimeSelect
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
                <Calendar
                label={'Départ'}
                selected={data.startDate}
                onChange={(date) => setData({...data, startDate: date, endDate: null})}
                minDate={new Date()} filterTime={filterPassedTimeStart}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 18)} 
                calendarStartDay={1}
                inline showDisabledMonthNavigation showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Heure"
                dateFormat="MMMM d, yyyy h:mm aa" />
            </section>
        
          
          {data.activity && data.withPilot && data.startDate && data.startDate.getHours() >= 9 &&
            <section>
                <Calendar
                label={'Retour'}
                selected={data.endDate}
                onChange={(date) => setData({...data, endDate: date})}
                minDate={data.startDate}
                filterTime={filterPassedTime}
                minTime={setHours(setMinutes(new Date(), 0), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 19)}
                calendarStartDay={1}
                inline
                showDisabledMonthNavigation
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Heure"
                dateFormat="MMMM d, yyyy h:mm aa" />
            </section>
          }
        </div>
}
          {data.activity && data.withPilot && data.startDate && data.startDate.getHours() >= 9 && data.endDate && data.endDate.getHours() >= 9 && data.endDate.getHours() <= 19 &&
            <button type="submit" className='bg-text text-beige block mx-auto px-8 py-2 rounded-lg hover:bg-primary-color-hover duration-300'>Réserver</button>
          }
      </form> 
    </section>
  );

}

export default CalendarParticulier
