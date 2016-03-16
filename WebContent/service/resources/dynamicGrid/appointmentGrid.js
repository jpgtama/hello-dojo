var appointmentGrid = {};
appointmentGrid.rowActionFunctionScope = {};

/* rowActionFunctionScope */

appointmentGrid.rowActionFunctionScope.confirmPatientArrivalDisable = function(row) {
    return row.followupStatus != 207;
};

appointmentGrid.rowActionFunctionScope.cancelPatientArrivalDisabled = function(row) {

    return row.followupStatus != 201;
};
appointmentGrid.rowActionFunctionScope.addNextAppointmentDisabled = function(row) {

    return false;
};

appointmentGrid.rowActionFunctionScope.cancelAppointmentDisabled = function(row) {

    return row.followupStatus == 902 || row.followupStatus == 201 ||  row.followupStatus == 901 || row.followupStatus == 205;
};
appointmentGrid.rowActionFunctionScope.printAppointmentDisabled = function(row) {
    return row.followupStatus != 207;
};
/* formatterScope */
appointmentGrid.formatterScope = {};

appointmentGrid.formatterScope.formatFollowUpStatus = function(value, row) {
    var item = row;
    var followupStatus = item.followupStatus;

    var className;

    if (item.followupStatus == '205') {

        className = 'orderWait';
    } else if (item.followupStatus == '207' || item.followupStatus == '206') {

        className = 'orderAlready';
    } else if (item.followupStatus == '201' || item.followupStatus == '208') {

        className = 'orderChecked';
    } else if (item.followupStatus == '902') {

        className = 'orderCancel';
    } else if (item.followupStatus == '904') {

        className = 'orderFailure';
    } else if (item.followupStatus == '901') {

        className = 'orderCompleted';
    }

    var statusDisplay = '<div class=\"' + className + '\" ></div>';

    var originalDisplay = '_business_status_' + followupStatus + '_';
    var display = '{\'' + originalDisplay + '\', i18n}';

    var temptext = '<span class=\"showtext\" >&nbsp;&nbsp;&nbsp;&nbsp;' + display + '</span>';

    return statusDisplay + temptext;

};

/* format occupy status */
appointmentGrid.formatterScope.formatOccupyStatus = function(value, row) {
    var item = row;
    var registrationSequenceStatus = item.registrationSequenceStatus;
    // 兼容处理。如果没有返回占号的状态值，默认为“未占号”
    if (!registrationSequenceStatus) {
        registrationSequenceStatus = '0'
    }
    var originalDisplay = '_registration_sequence_status_' + registrationSequenceStatus + '_';
    var display = '{\'' + originalDisplay + '\', i18n}';
    var temptext = '<span>' + display + '</span>';
    return temptext;
}

/* format bill status */
appointmentGrid.formatterScope.formatBillStatus = function(value, row) {
    var item = row;
    var billStatus = item.billingStatusCode;
    // 兼容处理。如果没有返回收费的状态值，默认为“未收费”
    if (!billStatus) {
        billStatus = '101';
    }
    var className;
    
    /**
     * "_billing_status_101_": "未收费",
     * "_billing_status_102_": "已收费",
     * "_billing_status_103_": "已退费",
     * "_billing_status_104_": "预付费".
     */
    
    if (item.billingStatusCode == '102') {
        className = 'paid';
    }else if(item.billingStatusCode == '103') {
        className = 'refunded';
    }else if(item.billingStatusCode == '104') {
        className = 'prepaid';
    } else{
        className = 'unpaid';
    }
    
    var statusDisplay = '<div class=\"' + className + '\" ></div>';
    var originalDisplay = '_billing_status_' + billStatus + '_';
    var display = '{\'' + originalDisplay + '\', i18n}';
    var temptext = '<span>&nbsp;' + display + '</span>';
    return statusDisplay + temptext;
}
