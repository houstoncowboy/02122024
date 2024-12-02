// 할일 목록을 저장할 배열
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 할일 추가 함수
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(todo);
        saveTodos();
        renderTodos();
        input.value = '';
    }
}

// 할일 삭제 함수
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// 할일 완료 토글 함수
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// localStorage에 할일 저장
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 할일 목록 화면에 표시
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'group flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200';
        li.innerHTML = `
            <div class="flex items-center space-x-3">
                <button onclick="toggleTodo(${todo.id})" 
                        class="w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            todo.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 hover:border-green-500'
                        }">
                    ${todo.completed ? '<i class="fas fa-check text-white text-xs"></i>' : ''}
                </button>
                <span class="${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}">
                    ${todo.text}
                </span>
            </div>
            <button onclick="deleteTodo(${todo.id})" 
                    class="text-gray-400 hover:text-red-500 transition-colors duration-200">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        todoList.appendChild(li);
    });
}

// 초기 할일 목록 표시
renderTodos();
