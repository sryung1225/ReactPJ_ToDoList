import React, {Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    //최적화
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }
      
    render() {
        const { text, checked, id, color, onToggle, onRemove } = this.props;

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); //onToggle 실행 안되도록
                    onRemove(id)}
                }>&times;</div>
                <div style={{ color }} className={`todo-text ${checked && 'checked'}`}> 
                    {/* "todo-text" + checked && 'checked' 와 동일*/}
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

export default TodoItem;