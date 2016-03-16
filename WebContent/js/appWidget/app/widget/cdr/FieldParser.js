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
 * FILE NAME: FieldParser.js
 * 
 * CREATED: 2016年1月4日 下午2:04:10
 * 
 * ORIGINAL AUTHOR(S): 310199253
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/cdr/select/CDRSelect',
    'dojo/_base/declare'
], function(CDRSelect, declare) {

    var parserMap = {};

    // select
    parserMap['select'] = function(defObject) {
        return new CDRSelect(defObject);
    };

    // 
    
    
    // 
    
    
    
    return {

        parse : function(/* def object */defObject) {
            // 
            var type = defObject.type;

            var parser = parserMap[type];

            if (parser) {
                var filedWidget = parser(defObject);
                
                // check column property, default value is 1
                filedWidget.set('column', defObject.column || 1); 
                
                return filedWidget;
            }else{
                console.error('parser for '+ type +' not found!!!');
            }
        }

    };
});