// markdown-editor.jsx

var React = require('react');
var marked = require('marked');

var MarkdownEditor = React.createClass({
    getInitialState: function() {
        return {
            value: 'Type any text in the textarea.'
        };
    },
    handleChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },
    transformText: function() {
        return {
            __html: marked(this.state.value)
        };
    },
    render: function() {
        return (
            <div>
                <h1>Markdown Editor</h1>
                <textarea defaultValue={this.state.value} onChange={this.handleChange} />
                <div dangerouslySetInnerHTML={this.transformText()} />
            </div>
        );
    }
});

module.exports = MarkdownEditor;
