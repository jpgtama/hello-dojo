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
 * FILE NAME: ArrayUtils.js
 * 
 * CREATED: 2015年7月9日 下午6:48:32
 *
 * ORIGINAL AUTHOR(S): 310187586
 * 
 * </pre>
 ******************************************************************************/
define([
    'dojo/_base/declare'
], function(declare) {
    return {
        sortByKey:function(array, orderBy) {
            var orderByTemp = orderBy.split(",");
            var orderByArr = [];
            for(var k=orderByTemp.length-1;k>=0;k--){
                var t = orderByTemp[k].split(" ");
                var newObj = null;
                if(t.length==1){
                    if(orderByArr.length==0){
                        newObj = {
                            filed:t[0],
                            order:"asc"
                        }
                    }else{
                        newObj = {
                            filed:t[0],
                            order:orderByArr[0].order
                        }
                    }
                }else{
                    newObj = {
                        filed:t[0],
                        order:t[1]
                    }
                }
                orderByArr.push(newObj);
            }
            //debugger;
            //var ordAlpah = (order == 'asc') ? '>' : '<';
            return array.sort(
                function(a,b){
                    for(var i=orderByArr.length-1;i>=0;i--){
                        if(a[orderByArr[i].filed] == b[orderByArr[i].filed]){
                            continue;
                        }
                        if(orderByArr[i].order == "desc"){
                           return a[orderByArr[i].filed]<b[orderByArr[i].filed]?1:-1
                        }else{
                           return a[orderByArr[i].filed]>b[orderByArr[i].filed]?1:-1
                        }
                    }
                }
               //new Function('a', 'b', 'return a["' + key + '"]' + ordAlpah + 'b["' + key + '"]?1:-1')
            );
        }
    }
});