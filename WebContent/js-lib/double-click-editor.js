/**
 * Created by 310199253 on 2016/5/30.
 */

var inputReadonly = {

    addEditorToInput: function (input) {
        //var input = document.getElementById('input3_1');

        input.addEventListener('dblclick', function (e) {
            this.removeAttribute('readonly');
        });

        var endEdit = function (e) {
            this.setAttribute('readonly', 'readonly');
        };

        input.addEventListener('blur', endEdit);
    }
};



var insertRemoveInput = {

    addEditorToElement: function(textWrapper){
        //var td1 = document.getElementById("td1");

        var td1 = textWrapper;

        td1.addEventListener('dblclick', function(e) {
            var tdStyle = getComputedStyle(this);
            var width = tdStyle.width;

            var v = this.innerHTML;
            this.innerHTML = '';

            var textbox = document.createElement('input');

            textbox.value = v;

            textbox.style.width = width;

            this.appendChild(textbox);

            textbox.focus();

            var td1 = this;

            var endEdit = function(e) {
                if (e.type === 'blur' || (e.type === 'keyup' && e.key === 'Enter')) {
                    // remove event, if not, an error will come: Failed to set the 'innerHTML' property on 'Element': The node to be removed is no longer a child of this node
                    this.removeEventListener('blur', endEdit);
                    this.removeEventListener('keyup', endEdit);

                    var v = this.value;
                    this.style.display = 'none';
                    td1.innerHTML = v;

                    // remove textbox
                    this.remove();
                }

            };

            // end edit
            textbox.addEventListener('blur', endEdit);
            textbox.addEventListener('keyup', endEdit);

            // stop bubbling
            textbox.addEventListener('dblclick', function(e) {
                e.stopPropagation();
            });

        });
    }
};

var useContentEditable = {
    addEditorToElement: function(textWrapper){
        //var td4_1 = document.getElementById("td4_1");
        var td4_1 = textWrapper;

        // start editor
        td4_1.addEventListener('dblclick', function(e){
            this.setAttribute('contenteditable', true);
            this.focus();

            // change bg color
            this.classList.add('editable');
        });

        // end editor
        td4_1.addEventListener('blur', function(e){
            this.removeAttribute('contenteditable');

            // toggle bg color
            this.classList.remove('editable');
        });
    }
};