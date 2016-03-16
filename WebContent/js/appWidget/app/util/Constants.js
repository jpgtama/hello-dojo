/*******************************************************************************
 * $Id: philipscicodetemplates.xml 276 2012-12-26 02:16:03Z wei.hu $
 * *****************************************************************************
 * 
 * <pre>
 *                         Philips Medical Systems
 *                © 2010 Koninklijke Philips Electronics N.V.
 *
 * All rights are reserved. Reproduction in whole or in part is
 * prohibited without the written consent of the copyright owner.
 *
 *
 * FILE NAME: Constants.js
 * 
 * CREATED: 2015年4月15日 下午2:24:34
 *
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/declare'
], function(declare) {
    return {
        common:{
            DIALOG_CANCEL_TOPIC : 'timeslotAddCancelled',
            LISTEN_USER_SETTING: 'grid/listenToUserSetting',
            SELECTED_COLUMNS_DATA_CHANGE:'selectedColumnsDataChange',
            COLSE_ADVANCE_SEARCH_DIALOG:'colseAdvanceSearchDialog'
        },
        appointment:{
            //topic
            SEARCH_TOPIC : 'searchFollowupAppointment',
            PROCEDURE_DATE_CHANGE_TOPIC:'procedureDateChange',
            PRACTITIONER_CHANGE_TOPIC:'practitionerDateChange',
            CAREPLAN_CLICK_TOPIC:'carePlanClick',
            CAREPLAN_ONLOAD_TOPIC:'carePlanOnLoad',
            TIMESLOT_REFRESH_TOPIC:'refreshTimeslotCalendar',
            RECOMMEN_DATE_LIST_CHANGE_TOPIC:'recommenDateListChange',
            RECOMMEN_CALENDAR_CHANGE_TOPIC:'recommenCalendarChange',
            RECOMMEN_CALENDAR_OTHER_CHANGE_TOPIC:'recommenCalendarOtherChange',
            RECOMMEN_DATE_DATA_CHANGE_TOPIC:'recommenDateDataChange',
            ADD_NEXT_APPOINTMENT_INIT_TOPIC:'addNextAppointmentInit',
            UPDATE_APPOINTMENT_INIT_TOPIC:'updateAppointmentInit',
            ENABLED_SAVE_BUTTON_TOPIC:'enabledSaveButton',
            RECOMMEN_CALENDAR_SWITCH_MONTH_TOPIC:'calendarSwitchMonth'
        },
        workDay:{
            TIMESLOT_UPDATE_FOR_BATCH_TOPIC:'timeslotBatchUpdate',
            TIMESLOT_DELETE_FOR_BATCH_TOPIC:'timeslotBatchDelete',
            TIMESLOT_REFRESH_WORK_CALENDAR:'timeslotRefreshWorkCalendar',
            TIMESLOT_CONFIRM_SAVE_TOPIC:'timeslotCofirmSave',
            TIMESLOT_CONFIRM_CANCEL_TOPIC:'timeslotCancelCofirm',
            TIMESLOT_CONFIRM_CLOSE_TOPIC:'timeslotCloseCofirm',
            CALENDAR_LOAD_DATA:'calendarReLoadData'
        },
        personalSearch: {
            SAVE_KEY: 'personalSearch'
        }
    };
});