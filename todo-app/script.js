document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const newTodoForm = document.querySelector('.new-todo-form');
    const newTodoInput = document.querySelector('.new-todo-input');
    const todoList = document.querySelector('.todo-list');
    const itemsLeftEl = document.querySelector('.items-left');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.querySelector('.clear-completed-btn');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    const applyTheme = (theme) => {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(`${theme}-theme`);
        localStorage.setItem('theme', theme);
    };

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(newTheme);
    });


    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);


    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true; 
        });

        todoList.innerHTML = '';

        if (filteredTodos.length === 0) {
            todoList.innerHTML = `<li class="todo-item empty-state"><p>No todos here!</p></li>`;
        } else {
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'todo-item--completed' : ''}`;
                li.setAttribute('data-id', todo.id);
                li.setAttribute('draggable', true);

                li.innerHTML = `
                    <div class="checkbox-wrapper">
                      <input type="checkbox" id="todo-${todo.id}" class="checkbox-input" ${todo.completed ? 'checked' : ''}>
                      <label for="todo-${todo.id}" class="checkbox-label" aria-label="Mark todo as ${todo.completed ? 'incomplete' : 'complete'}"></label>
                    </div>
                    <p>${todo.text}</p>
                    <button class="delete-btn" aria-label="Delete todo"></button>
                `;
                todoList.appendChild(li);
            });
        }
        updateItemsLeft();
    };

    const updateItemsLeft = () => {
        const activeTodosCount = todos.filter(todo => !todo.completed).length;
        itemsLeftEl.textContent = `${activeTodosCount} item${activeTodosCount !== 1 ? 's' : ''} left`;
    };

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = newTodoInput.value.trim();
        if (todoText) {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false,
            };
            todos.push(newTodo);
            saveTodos();
            renderTodos();
            newTodoInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        const todoId = parseInt(e.target.closest('.todo-item')?.dataset.id);
        if (!todoId) return;

        if (e.target.classList.contains('checkbox-label') || e.target.classList.contains('checkbox-input')) {
            const todo = todos.find(t => t.id === todoId);
            if (todo) {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            }
        }

          if (e.target.classList.contains('delete-btn')) {
            todos = todos.filter(t => t.id !== todoId);
            saveTodos();
            renderTodos();
        }
    });

    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });


    let draggedItem = null;

    todoList.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('todo-item')) {
            draggedItem = e.target;
            setTimeout(() => {
                e.target.classList.add('todo-item--dragging');
            }, 0);
        }
    });

    todoList.addEventListener('dragend', (e) => {
        if (draggedItem) {
            draggedItem.classList.remove('todo-item--dragging');
            draggedItem = null;

            const newOrderIds = [...todoList.querySelectorAll('.todo-item')].map(item => parseInt(item.dataset.id));
            
            todos.sort((a, b) => newOrderIds.indexOf(a.id) - newOrderIds.indexOf(b.id));

            saveTodos();
        }
    });
    
    todoList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(todoList, e.clientY);
        const currentDraggable = document.querySelector('.todo-item--dragging');
        if (currentDraggable) {
            if (afterElement == null) {
                todoList.appendChild(currentDraggable);
            } else {
                todoList.insertBefore(currentDraggable, afterElement);
            }
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.todo-item:not(.todo-item--dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    renderTodos();
});