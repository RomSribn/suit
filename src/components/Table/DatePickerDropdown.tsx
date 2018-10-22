import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';

import DayPicker from 'react-day-picker';

import 'react-day-picker/lib/style.css';

import { loc } from './loc';
import { getOffset } from '../../utils';
import { Button } from '../../components/Button';

const ordersDatePickerClass = 'orders__date-picker';
const inputBoxClass = 'input-box';

interface TProps {
  show: boolean;
  pickerKey?: string;
  data?: FilterData;
  lang: string;
  onClickOuterDatePickerFilter(): void;
}

interface TState {
  fields: DatePickerFilterFields;
  activeCalendar: string;
}

class DatePickerDropdown extends React.Component<TProps, TState> {
  datePickerInner?: HTMLElement;
  constructor(props: TProps) {
    super(props);
    const fields = {
      dateFrom: '',
      dateTo: '',
    };
    this.state = {
      fields,
      activeCalendar: ''
    };
  }

  setActiveCalendar = (calendarType?: string) => {
    const { activeCalendar } = this.state;
    this.setState({
      activeCalendar: activeCalendar === calendarType || !calendarType
        ? ''
        : calendarType
    });
  }

  onClickClear = () => {
    this.setState({
      fields: {
        dateFrom: '',
        dateTo: ''
      }
    });
  }

  onClickSubmit = () => {
    const {
      data
    } = this.props;
    const {
      fields
    } = this.state;
    data!.setFilterValue && data!.setFilterValue!(fields); // tslint:disable-line
  }
  componentDidMount() {
    const {
      show,
    } = this.props;
    if (show) {
      this.updatePosition();
    }
  }
  updatePosition = () => {
    const {
      data
    } = this.props;
    if (data!.inputRef && data!.inputRef.current && this.datePickerInner) {
      const wrapperElementPosition = getOffset(data!.inputRef.current);
      const datePickerPosition = getOffset(this.datePickerInner!);
      this.datePickerInner!.style.left =
        (
          wrapperElementPosition.left - (datePickerPosition.left * 1.02)
        ) + 'px';
      this.datePickerInner!.style.top =
        (
          wrapperElementPosition.top - (datePickerPosition.top / 2)
        ) + 'px';
    }
  }
  componentDidUpdate(prevProps: TProps) {
    if ((this.props.show !== prevProps.show && this.props.show)
      || this.props.data !== prevProps.data) {
      this.updatePosition();
    }
  }

  valueIsValid = (fieldName: string, value: string) => {
    const { fields } = this.state;
    const {
      dateFrom,
      dateTo
    } = fields;
    if (fieldName === 'dateFrom') {
      return dateTo === '' ||
        value.length !== 10 || moment(value, 'DD.MM.YYYY').isBefore(moment(dateTo, 'DD.MM.YYYY'));
    } else if (fieldName === 'dateTo') {
      return dateFrom === '' ||
        value.length !== 10 || moment(value, 'DD.MM.YYYY').isAfter(moment(dateFrom, 'DD.MM.YYYY'));
    }
    return true;
  }

  setField = (fieldName: string, value: string) => {
    if (this.valueIsValid(fieldName, value)) {
      const newStateFileds = this.state.fields;
      if (value.length < newStateFileds[fieldName].length || value.length >= 8 && value.length <= 10) {
        newStateFileds[fieldName] = value;
        this.setState({ fields: newStateFileds });
      } else {
        const newChar = value.replace(newStateFileds[fieldName], '');
        const regexChar = new RegExp('^\\d+$');
        if (regexChar.test(newChar)) {
          const dateWithoutDot = value.replace(/\./g, '');
          if (dateWithoutDot.length <= 8) {
            newStateFileds[fieldName] = value;
            if (dateWithoutDot.length % 2 === 0 && dateWithoutDot.length <= 4) {
              newStateFileds[fieldName] += '.';
            }
            this.setState({ fields: newStateFileds });
          }
        }
      }
    }
  }

  render() {
    const {
      show,
      onClickOuterDatePickerFilter,
      lang
    } = this.props;
    const {
      fields,
      activeCalendar
    } = this.state;
    const {
      dateFrom,
      dateTo
    } = fields;
    if (!show) {
      return null;
    }
    return (
      <div
        onClick={onClickOuterDatePickerFilter}
        className={classNames(ordersDatePickerClass, ordersDatePickerClass + '__wrapper')}
      >
        <div
          ref={comp => this.datePickerInner = comp!}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={classNames(ordersDatePickerClass + '__inner')}
        >
          <div className="top-input-wrapper">
            <div className={classNames(inputBoxClass)}>
              <p className={classNames(inputBoxClass + '__input-label')}>
                {loc[lang].from}
              </p>
              <input
                type="text"
                className={classNames(inputBoxClass + '-input')}
                onChange={(e: { target: HTMLInputElement; }) => this.setField('dateFrom', e.target.value)}
                placeholder={'00.00.0000'}
                value={dateFrom}
                onBlur={() => this.setActiveCalendar()}
              />
              <span onClick={() => this.setActiveCalendar('dateFrom')} className="datepicker__icon"/>
            </div>
          </div>
          <div className={classNames('picker-wrapper', { active: activeCalendar === 'dateFrom' })}>
            <DayPicker
              selectedDays={[moment(dateFrom, 'DD.MM.YYYY').toDate()]}
              locale={lang}
              months={loc[lang].months}
              weekdaysShort={loc[lang].weekDaysShort  as [string, string, string, string, string, string, string]} // tslint:disable-line
              onDayClick={day => this.setField('dateFrom', moment(day).format('DD.MM.YYYY'))}
            />
          </div>
          <div className="bottom-input-wrapper">
            <div className={classNames(inputBoxClass)}>
              <p className={classNames(inputBoxClass + '__input-label')}>
                {loc[lang].till}
              </p>
              <input
                type="text"
                className={classNames(inputBoxClass + '-input')}
                onChange={(e: { target: HTMLInputElement; }) => this.setField('dateTo', e.target.value)}
                placeholder={'00.00.0000'}
                value={dateTo}
                onBlur={() => this.setActiveCalendar()}
              />
              <span onClick={() => this.setActiveCalendar('dateTo')} className="datepicker__icon"/>
            </div>
          </div>
          <div className={classNames('picker-wrapper', { active: activeCalendar === 'dateTo' })}>
            <DayPicker
              selectedDays={[moment(dateTo, 'DD.MM.YYYY').toDate()]}
              locale={lang}
              months={loc[lang].months}
              weekdaysShort={loc[lang].weekDaysShort as [string, string, string, string, string, string, string]} // tslint:disable-line
              onDayClick={day => this.setField('dateTo', moment(day).format('DD.MM.YYYY'))}
            />
          </div>
          <div className="btns-wrapper">
            <div className="btn-wrapper">
              <Button
                onClick={this.onClickClear}
                theme="white"
              >
                <p>{loc[lang].clear}</p>
              </Button>
            </div>
            <div className="btn-wrapper">
              <Button
                onClick={this.onClickSubmit}
                theme="black"
              >
                <p>{loc[lang].submit}</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {
  DatePickerDropdown
};