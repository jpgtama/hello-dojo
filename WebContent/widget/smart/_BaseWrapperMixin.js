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
 * FILE NAME: _BaseWrapperMixin.js
 * 
 * CREATED: 2016年2月26日 下午1:13:38
 * 
 * ORIGINAL AUTHOR(S): 310078398
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/widget/smart/_BaseElementMixin',
    'dojo/_base/declare'
], function(_BaseElementMixin, declare) {
    return declare('app.widget.smart._BaseWrapperMixin', [
        _BaseElementMixin
    ], {

        /**
         * internal element
         */
        _element : null,

        /**
         * chains, but has some problems
         */
        '-chains-' : {
            setElement : 'after',
            initElement : 'before'
        },

        /**
         * set element
         */
        setElement : function(element) {
            this.set('_element', element);
        },

        /**
         * get element
         */
        getElement : function() {
            return this.get('_element');
        },

        /**
         * Override, init element
         */
        initElement : function(/* Object */options) {
            var e = this.getElement();
            if (e && e.initElement) {
                e.initElement(options);
            }
        },

        /**
         * Override, show label defined by element
         */
        hasLabel : function(/* Object */options) {
            var e = this.getElement();
            if (e && e.hasLabel) {
                return e.hasLabel(options);
            }
            return true;
        }

    });
});