// Добавьте эти функции в ваш файл tree-creator.js

// Функции для работы с динамическими полями
function addEducationField() {
    const container = document.getElementById('educationContainer');
    const div = document.createElement('div');
    div.className = 'input-group mb-2';
    div.innerHTML = `
        <input type="text" class="form-control education-input" placeholder="Учебное заведение">
        <button class="btn btn-outline-danger" type="button" onclick="removeEducation(this)">×</button>
    `;
    container.appendChild(div);
}

function removeEducation(button) {
    if (document.querySelectorAll('.education-input').length > 1) {
        button.parentElement.remove();
    }
}

function addProfessionField() {
    const container = document.getElementById('professionContainer');
    const div = document.createElement('div');
    div.className = 'input-group mb-2';
    div.innerHTML = `
        <input type="text" class="form-control profession-input" placeholder="Профессия">
        <button class="btn btn-outline-danger" type="button" onclick="removeProfession(this)">×</button>
    `;
    container.appendChild(div);
}

function removeProfession(button) {
    if (document.querySelectorAll('.profession-input').length > 1) {
        button.parentElement.remove();
    }
}

function addResidenceField() {
    const container = document.getElementById('residenceContainer');
    const div = document.createElement('div');
    div.className = 'residence-item mb-3 p-3 border rounded';
    div.innerHTML = `
        <div class="row g-2">
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Страна">
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" placeholder="Город">
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" placeholder="Улица">
            </div>
            <div class="col-md-2">
                <input type="text" class="form-control" placeholder="Дом">
            </div>
            <div class="col-md-3">
                <input type="date" class="form-control" placeholder="С">
            </div>
            <div class="col-md-3">
                <input type="date" class="form-control" placeholder="По">
            </div>
            <div class="col-md-4">
                <button class="btn btn-outline-danger w-100" type="button" onclick="removeResidence(this)">Удалить</button>
            </div>
        </div>
    `;
    container.appendChild(div);
}

function removeResidence(button) {
    if (document.querySelectorAll('.residence-item').length > 1) {
        button.closest('.residence-item').remove();
    }
}

function addDocumentField() {
    const container = document.getElementById('documentsContainer');
    const div = document.createElement('div');
    div.className = 'input-group mb-2';
    div.innerHTML = `
        <input type="file" class="form-control document-input">
        <button class="btn btn-outline-danger" type="button" onclick="removeDocument(this)">×</button>
    `;
    container.appendChild(div);
}

function removeDocument(button) {
    if (document.querySelectorAll('.document-input').length > 1) {
        button.parentElement.remove();
    }
}

// Обновлённая функция добавления/редактирования узла
function addNodeToTree() {
    const nodeId = document.getElementById('nodeId').value || generateId();
    const type = document.getElementById('nodeType').value;
    
    // Сбор данных из формы
    const personData = {
        id: nodeId,
        type,
        lastName: document.getElementById('lastName').value,
        maidenName: document.getElementById('maidenName').value,
        firstName: document.getElementById('firstName').value,
        middleName: document.getElementById('middleName').value,
        photoUrl: document.getElementById('photoUrl').value || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        birthDate: document.getElementById('birthDate').value,
        isBirthDateApprox: document.getElementById('isBirthDateApprox').checked,
        birthPlace: {
            country: document.getElementById('birthCountry').value,
            city: document.getElementById('birthCity').value,
            street: document.getElementById('birthStreet').value,
            house: document.getElementById('birthHouse').value,
            apartment: document.getElementById('birthApartment').value
        },
        deathDate: document.getElementById('deathDate').value,
        isDeathDateApprox: document.getElementById('isDeathDateApprox').checked,
        deathPlace: {
            country: document.getElementById('deathCountry').value,
            city: document.getElementById('deathCity').value
        },
        nationality: document.getElementById('nationality').value,
        socialStatus: document.getElementById('socialStatus').value,
        education: Array.from(document.querySelectorAll('.education-input')).map(input => input.value),
        professions: Array.from(document.querySelectorAll('.profession-input')).map(input => input.value),
        residences: Array.from(document.querySelectorAll('.residence-item')).map(item => ({
            country: item.querySelector('input:nth-child(1)').value,
            city: item.querySelector('input:nth-child(2)').value,
            street: item.querySelector('input:nth-child(3)').value,
            house: item.querySelector('input:nth-child(4)').value,
            fromDate: item.querySelector('input:nth-child(5)').value,
            toDate: item.querySelector('input:nth-child(6)').value
        })),
        sourceInfo: document.getElementById('sourceInfo').value,
        comment: document.getElementById('comment').value,
        documents: Array.from(document.querySelectorAll('.document-input')).map(input => input.files[0])
    };
    
    // Создание/обновление узла
    let node;
    const existingNode = nodes.find(n => n.id === nodeId);
    
    if (existingNode) {
        // Обновление существующего узла
        node = existingNode.element;
        Object.assign(existingNode, personData);
    } else {
        // Создание нового узла
        node = document.createElement('div');
        node.className = 'tree-node fade-in';
        node.dataset.id = nodeId;
        
        nodes.push({
            id: nodeId,
            element: node,
            ...personData
        });
    }
    
    // Обновление отображения узла
    updateNodeVisual(node, personData);
    
    // Позиционирование узла
    if (!existingNode) {
        positionNode(node, type);
    }
    
    treeCanvas.appendChild(node);
    drawConnectors();
}

function updateNodeVisual(node, data) {
    // Форматирование дат
    const birthDateStr = data.birthDate ? formatDate(data.birthDate) + (data.isBirthDateApprox ? ' (прибл.)' : '') : '?';
    const deathDateStr = data.deathDate ? formatDate(data.deathDate) + (data.isDeathDateApprox ? ' (прибл.)' : '') : '';
    
    // Создание HTML для узла
    node.innerHTML = `
        <img src="${data.photoUrl}" class="node-photo" alt="${data.firstName} ${data.lastName}">
        <div class="node-name">${data.lastName} ${data.firstName} ${data.middleName || ''}</div>
        <div class="node-dates">${birthDateStr}${deathDateStr ? ' - ' + deathDateStr : ''}</div>
        ${data.birthPlace.city ? `<div class="node-place small">${data.birthPlace.city}</div>` : ''}
    `;
    
    // Добавление обработчиков
    node.addEventListener('click', function(e) {
        e.stopPropagation();
        selectNode(node);
    });
}

// Функция для заполнения формы при редактировании
function fillFormWithPersonData(person) {
    document.getElementById('formTitle').textContent = 'Редактировать данные';
    document.getElementById('nodeId').value = person.id;
    document.getElementById('nodeType').value = person.type;
    document.getElementById('lastName').value = person.lastName || '';
    document.getElementById('maidenName').value = person.maidenName || '';
    document.getElementById('firstName').value = person.firstName || '';
    document.getElementById('middleName').value = person.middleName || '';
    document.getElementById('photoUrl').value = person.photoUrl || '';
    document.getElementById('birthDate').value = person.birthDate || '';
    document.getElementById('isBirthDateApprox').checked = person.isBirthDateApprox || false;
    document.getElementById('deathDate').value = person.deathDate || '';
    document.getElementById('isDeathDateApprox').checked = person.isDeathDateApprox || false;
    document.getElementById('birthCountry').value = person.birthPlace?.country || '';
    document.getElementById('birthCity').value = person.birthPlace?.city || '';
    document.getElementById('birthStreet').value = person.birthPlace?.street || '';
    document.getElementById('birthHouse').value = person.birthPlace?.house || '';
    document.getElementById('birthApartment').value = person.birthPlace?.apartment || '';
    document.getElementById('deathCountry').value = person.deathPlace?.country || '';
    document.getElementById('deathCity').value = person.deathPlace?.city || '';
    document.getElementById('nationality').value = person.nationality || '';
    document.getElementById('socialStatus').value = person.socialStatus || '';
    document.getElementById('sourceInfo').value = person.sourceInfo || '';
    document.getElementById('comment').value = person.comment || '';
    
    // Заполнение образования
    const educationContainer = document.getElementById('educationContainer');
    educationContainer.innerHTML = '';
    if (person.education && person.education.length > 0) {
        person.education.forEach((edu, index) => {
            const div = document.createElement('div');
            div.className = 'input-group mb-2';
            div.innerHTML = `
                <input type="text" class="form-control education-input" placeholder="Учебное заведение" value="${edu}">
                <button class="btn btn-outline-danger" type="button" onclick="removeEducation(this)">×</button>
            `;
            educationContainer.appendChild(div);
        });
    } else {
        addEducationField();
    }
    
    // Заполнение профессий
    const professionContainer = document.getElementById('professionContainer');
    professionContainer.innerHTML = '';
    if (person.professions && person.professions.length > 0) {
        person.professions.forEach((prof, index) => {
            const div = document.createElement('div');
            div.className = 'input-group mb-2';
            div.innerHTML = `
                <input type="text" class="form-control profession-input" placeholder="Профессия" value="${prof}">
                <button class="btn btn-outline-danger" type="button" onclick="removeProfession(this)">×</button>
            `;
            professionContainer.appendChild(div);
        });
    } else {
        addProfessionField();
    }
    
    // Заполнение мест жительства
    const residenceContainer = document.getElementById('residenceContainer');
    residenceContainer.innerHTML = '';
    if (person.residences && person.residences.length > 0) {
        person.residences.forEach(res => {
            const div = document.createElement('div');
            div.className = 'residence-item mb-3 p-3 border rounded';
            div.innerHTML = `
                <div class="row g-2">
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Страна" value="${res.country || ''}">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Город" value="${res.city || ''}">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="Улица" value="${res.street || ''}">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control" placeholder="Дом" value="${res.house || ''}">
                    </div>
                    <div class="col-md-3">
                        <input type="date" class="form-control" placeholder="С" value="${res.fromDate || ''}">
                    </div>
                    <div class="col-md-3">
                        <input type="date" class="form-control" placeholder="По" value="${res.toDate || ''}">
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-outline-danger w-100" type="button" onclick="removeResidence(this)">Удалить</button>
                    </div>
                </div>
            `;
            residenceContainer.appendChild(div);
        });
    } else {
        addResidenceField();
    }
    
    // Показываем кнопку удаления
    document.getElementById('deleteNode').style.display = 'block';
}

// Обновлённая функция выбора узла
function selectNode(node) {
    // Сброс предыдущего выбора
    if (selectedNode) {
        selectedNode.classList.remove('selected');
    }
    
    // Установка нового выбора
    selectedNode = node;
    node.classList.add('selected');
    
    // Поиск данных узла
    const nodeId = node.dataset.id;
    const personData = nodes.find(n => n.id === nodeId);
    
    // Заполнение формы данными узла
    if (personData) {
        fillFormWithPersonData(personData);
        showNodeForm(personData.type);
    }
}

// Функция генерации ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}