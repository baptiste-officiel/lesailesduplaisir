import React from 'react'
import DatePicker from 'react-datepicker'

type CalendarType = {
    label?: string;
    selected?: Date | null;
    onChange: (date: Date) => void;
    minDate?: Date;
    filterTime?: (date: Date) => boolean;
    minTime?: Date;
    maxTime?: Date;
    calendarStartDay?: number;
    inline?: boolean;
    showDisabledMonthNavigation?: boolean;
    showTimeSelect?: boolean;
    timeFormat?: string;
    timeIntervals?: number;
    timeCaption?: string;
    dateFormat?: string
}

const Calendar = ({
    label,
    selected,
    onChange,
    minDate,
    filterTime,
    minTime,
    maxTime,
    calendarStartDay,
    inline,
    showDisabledMonthNavigation,
    showTimeSelect,
    timeFormat,
    timeIntervals,
    timeCaption,
    dateFormat
}: CalendarType) => {
  return (
    <section>
              <h6 className='text-center mb-4 font-semibold border-b-2 border-text pb-2'>{label}</h6>
                <DatePicker
                selected={selected}
                onChange={onChange}
                minDate={minDate}
                filterTime={filterTime}
                minTime={minTime}
                maxTime={maxTime} 
                calendarStartDay={calendarStartDay}
                inline={inline}
                showDisabledMonthNavigation={showDisabledMonthNavigation}
                showTimeSelect={showTimeSelect}
                timeFormat={timeFormat}
                timeIntervals={timeIntervals}
                timeCaption={timeCaption}
                dateFormat={dateFormat}
                />
            </section>
  )
}

export default Calendar
