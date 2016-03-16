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
 * FILE NAME: ListenerUtil.js
 * 
 * CREATED: 2015年6月18日 上午10:22:11
 * 
 * ORIGINAL AUTHOR(S): 310189849
 * 
 * </pre>
 ******************************************************************************/
define([
    'app/lang/router',
    'app/lang/topic',
    'app/util/ResourceUtil',
    'dijit/registry',
    'dojo/on',
    'dojo/query',
    'dojo/_base/array',
    'dojo/_base/lang'
], function(router, topic, i18n, registry, on, query, array, lang) {

    var _topicHandles = [];

    var _TOPIC_KEYS = {
        FORM_DATA_CHANGE : '/form/data/change',
        FORM_DATA_CHANGE_PAGE_LOCK : '/form/data/change/page/lock',
        FORM_DATA_CHANGE_TAB_LOCK : '/form/data/change/tab/lock'
    };

    var _page_changed_lock = false;

    var _PAGE_CHANGED_LOCK_MESSAGE = 'Page Locked When Form Data Is Changed But Not Saved.';

    // TODO
    topic.subscribe(_TOPIC_KEYS.FORM_DATA_CHANGE_PAGE_LOCK, function(value) {
        _page_changed_lock = value;
    });

    window.onbeforeunload = function() {
        return _page_changed_lock ? i18n.getText('_onbeforeunload_message_') : void (0);
    };

    // interceptor
    router.registerBefore('.*', function(evt) {
        if (_page_changed_lock) {
            var result = window.confirm(i18n.getText('_onbeforeunload_message_'));

            if (result) {
                topic.publish(_TOPIC_KEYS.FORM_DATA_CHANGE_PAGE_LOCK, false);
                // _page_changed_lock = false;
                return;
            }

            topic.publish(_TOPIC_KEYS.FORM_DATA_CHANGE_TAB_LOCK);
            evt.preventDefault();
            evt.stopImmediatePropagation();
            // throw false;
            throw _PAGE_CHANGED_LOCK_MESSAGE;
        }
    });

    return {
        /**
         * Internal topic keys for something
         */
        TOPIC_KEYS : lang.clone(_TOPIC_KEYS),

        /**
         * 
         */
        subscribeDataChange : function(/* Function */listener, /* Boolean */once) {
            var handle = topic.subscribe(_TOPIC_KEYS.FORM_DATA_CHANGE, listener);
            if (once) {
                handle.remove();
                return;
            }
            _topicHandles.push(handle);
            return handle;
        },

        /**
         * 
         */
        removeDataChange : function(/* Object */handle) {
            // handle is topic.subscribe object
            if (handle) {
                handle.remove();
                var index = array.indexOf(_topicHandles, handle);
                if (index > -1) {
                    _topicHandles.splice(index, 1);
                }
            }
        },

        /**
         * 
         */
        publishDataChange : function(/* Object */event) {
            var handle = topic.publish(_TOPIC_KEYS.FORM_DATA_CHANGE, event);
            return handle;
        },

        /**
         * 
         */
        watchStatefulData : function(/* Stateful */target) {
            var _this = this;
            // TODO how to check stateful?
            if (target._watchCallbacks) {
                var watchs = Array.prototype.slice.call(arguments, 1);
                if (watchs.length == 0) {
                    for ( var i in target._watchCallbacks)
                        watchs.push(i.replace(/^_/, ''));
                }
                var _watchHandlerArray = array.map(watchs, function(item) {
                    return target.watch(item, function(name, oldValue, value) {
                        _this.publishDataChange();
                    });
                })
                return _watchHandlerArray;
            }
        },

        /**
         * setPageChangedLock to true will confirm a leaving warning
         */
        setPageChangedLock : function(/* Boolean */isLock) {
            // TODO
            topic.publish(_TOPIC_KEYS.FORM_DATA_CHANGE_PAGE_LOCK, isLock);
            // _page_changed_lock = isLock;
        },

        /**
         * @param target:目标按钮的Id
         * @param disabled:是否激活按钮的标志
         * @param eventMap:对指定的元素注册事件，比如{
         *            'keydown' :
         *            '#adminCreateNameId,#adminCreateJobNumberId,#adminCreateUserNameId,#adminCreatePwdId',
         *            },可以改变目标按钮target是否激活(enable or disable)
         */
        toggleButton : function(/* String */target,/* Boolean */disabled, /* Object */eventMap) {

            // 没有目标按钮的操作对象，直接返回
            if (!target)
                return;

            // 得到目标按钮
            var targetButton = registry.byId(target);

            // 如果没有获取到页面上的目标按钮元素，直接返回
            if (!targetButton)
                return;

            // 如果调用接口的时候没有传递对于目标按钮元素是否激活的标志，则默认对当前的目标按钮disabled值取反
            if (disabled == undefined || disabled == null) {
                disabled = !targetButton.get('disabled');
            }

            if (!eventMap) {
                // 如果调用接口的时候没有传递元素的注册事件的Map，则直接实现对这个按钮要实现的效果(enable or disable)
                targetButton.set('disabled', disabled);
            } else {
                // 按照元素的注册事件的map，对每个元素注册事件，控制目标按钮的状态改变
                for ( var event in eventMap) {
                    on(query(eventMap[event]), event, function(e) {
                        targetButton.set('disabled', disabled);
                    });
                }
            }
        }
    }

});
