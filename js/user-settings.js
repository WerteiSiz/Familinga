document.addEventListener('DOMContentLoaded', function() {
    // Обработка загрузки фото профиля
    document.getElementById('photo')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('profilePhoto').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Добавление нового блока образования
    let educationCount = 1;
    document.getElementById('addEducation')?.addEventListener('click', function() {
        educationCount++;
        const newEducation = `
            <div class="education-item">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="education${educationCount}" class="form-label">Учебное заведение</label>
                        <input type="text" class="form-control" id="education${educationCount}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="educationYearFrom${educationCount}" class="form-label">Год начала</label>
                        <input type="number" class="form-control" id="educationYearFrom${educationCount}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="educationYearTo${educationCount}" class="form-label">Год окончания</label>
                        <input type="number" class="form-control" id="educationYearTo${educationCount}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="educationSpecialty${educationCount}" class="form-label">Специальность</label>
                        <input type="text" class="form-control" id="educationSpecialty${educationCount}">
                    </div>
                </div>
                <span class="remove-item"><i class="bi bi-trash"></i></span>
            </div>
        `;
        document.getElementById('educationItems').insertAdjacentHTML('beforeend', newEducation);
    });
    
    // Добавление нового блока профессии
    let professionCount = 1;
    document.getElementById('addProfession')?.addEventListener('click', function() {
        professionCount++;
        const newProfession = `
            <div class="profession-item">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="profession${professionCount}" class="form-label">Профессия</label>
                        <input type="text" class="form-control" id="profession${professionCount}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="professionYearFrom${professionCount}" class="form-label">Год начала</label>
                        <input type="number" class="form-control" id="professionYearFrom${professionCount}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="professionYearTo${professionCount}" class="form-label">Год окончания</label>
                        <input type="number" class="form-control" id="professionYearTo${professionCount}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="professionPlace${professionCount}" class="form-label">Место работы</label>
                        <input type="text" class="form-control" id="professionPlace${professionCount}">
                    </div>
                </div>
                <span class="remove-item"><i class="bi bi-trash"></i></span>
            </div>
        `;
        document.getElementById('professionItems').insertAdjacentHTML('beforeend', newProfession);
    });
    
    // Добавление нового блока места жительства
    let residenceCount = 1;
    document.getElementById('addResidence')?.addEventListener('click', function() {
        residenceCount++;
        const newResidence = `
            <div class="residence-item">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="residencePlace${residenceCount}" class="form-label">Место жительства</label>
                        <input type="text" class="form-control" id="residencePlace${residenceCount}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="residenceYearFrom${residenceCount}" class="form-label">Год начала</label>
                        <input type="number" class="form-control" id="residenceYearFrom${residenceCount}">
                    </div>
                    <div class="col-md-3 mb-3">
                        <label for="residenceYearTo${residenceCount}" class="form-label">Год окончания</label>
                        <input type="number" class="form-control" id="residenceYearTo${residenceCount}">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 mb-3">
                        <label for="residenceSource${residenceCount}" class="form-label">Как получены сведения</label>
                        <input type="text" class="form-control" id="residenceSource${residenceCount}" placeholder="Укажите источник информации">
                    </div>
                </div>
                <span class="remove-item"><i class="bi bi-trash"></i></span>
            </div>
        `;
        document.getElementById('residenceItems').insertAdjacentHTML('beforeend', newResidence);
    });
    
    // Удаление элементов
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('bi-trash') || e.target.parentElement.classList.contains('remove-item')) {
            const itemToRemove = e.target.closest('.education-item, .profession-item, .residence-item');
            if (itemToRemove) {
                itemToRemove.remove();
            }
        }
    });
});