/* eslint-disable react/prop-types */
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorTextArea(props) {
    const editorRef = useRef(null);
    return (
        <>
            <Editor                
                apiKey='ufcb3pb1v6yrmtp2pd42m9ey6agt0rjhtbcplxdm9afjzcxe'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={props.defaultValue}
                init={{
                    height: 500,
                    width: 600,
                    menubar: false,
                    // forced_root_block : 'p',
                    // force_br_newlines : true,
                    // force_p_newlines : false,
                    directionality: 'ltr',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic underline backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={() => props.handleEditorContent(props.name ,editorRef.current.getContent())}
            />
        </>
    );
}