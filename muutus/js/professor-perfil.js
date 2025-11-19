// Dados de avaliações de exemplo
const reviewsData = {
    1: [
        { author: "Maria Silva", date: "15/11/2024", rating: 5, text: "Excelente professor! Muito paciente e didático. Aprendi muito nas aulas de violão." },
        { author: "João Pedro", date: "10/11/2024", rating: 5, text: "Recomendo demais! Consegui evoluir muito rápido com as técnicas ensinadas." },
        { author: "Vanessa Silva", date: "05/11/2024", rating: 4, text: "Muito bom! Só achei que poderia ter mais material de apoio." }
    ],
    2: [
        { author: "Carlos Mendes", date: "18/11/2024", rating: 5, text: "Fotógrafa incrível! Aprendi técnicas profissionais que já estou usando." },
        { author: "Juliana Santos", date: "12/11/2024", rating: 5, text: "Aulas práticas e objetivas. Valeu muito a pena!" }
    ],
    3: [
        { author: "Pedro Oliveira", date: "20/11/2024", rating: 5, text: "Melhor professor de Python que já tive. Explica de forma muito clara." },
        { author: "Mariana Lima", date: "14/11/2024", rating: 5, text: "Excelente didática! Consegui aprender conceitos complexos facilmente." },
        { author: "Lucas Ferreira", date: "08/11/2024", rating: 4, text: "Muito bom, mas às vezes vai um pouco rápido demais." }
    ]
};

// Carregar perfil do professor
function loadTeacherProfile() {
    const teacherId = parseInt(localStorage.getItem('selectedTeacherId'));
    const teacher = window.teachersData?.find(t => t.id === teacherId);
    
    if (!teacher) {
        document.getElementById('profileContent').innerHTML = `
            <div class="empty-state">
                <h3>Professor não encontrado</h3>
                <p>O professor que você está procurando não existe.</p>
                <button class="btn-primary" onclick="window.location.href='professores.html'">Ver Todos os Professores</button>
            </div>
        `;
        return;
    }

    const isFav = isFavorite(teacher.id);
    const reviews = reviewsData[teacher.id] || [];
    const avgRating = teacher.rating;
    
    // Calcular distribuição de avaliações
    const ratingDistribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
        ratingDistribution[review.rating - 1]++;
    });

    const profileHTML = `
        <div class="profile-main">
            <!-- Header do Perfil -->
            <div class="profile-header">
                <div class="profile-top">
                    <img src="${teacher.image}" alt="${teacher.name}" class="profile-avatar">
                    <div class="profile-info">
                        <h1 class="profile-name">${teacher.name}</h1>
                        <p class="profile-specialty">${teacher.specialty}</p>
                        <div class="profile-stats">
                            <div class="stat-item">
                                <span class="stars">${'★'.repeat(Math.floor(avgRating))}${'☆'.repeat(5 - Math.floor(avgRating))}</span>
                                <span class="stat-value">${avgRating} (${teacher.reviews} avaliações)</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-value">${teacher.reviews} alunos</span>
                            </div>
                        </div>
                        <div class="profile-badges">
                            <span class="badge badge-verified">✓ Verificado</span>
                            ${teacher.available ? '<span class="badge badge-available">Disponível</span>' : ''}
                        </div>
                    </div>
                </div>
                <p class="profile-bio">${teacher.bio}</p>
            </div>

            <!-- Sobre -->
            <div class="profile-section">
                <h2 class="section-title">Sobre</h2>
                <div class="section-content">
                    <p>Olá! Sou ${teacher.name} e tenho grande paixão por ensinar ${teacher.specialty.toLowerCase()}. Com anos de experiência na área, desenvolvi uma metodologia única que ajuda meus alunos a alcançarem seus objetivos de forma eficiente e prazerosa.</p>
                    <p>Minhas aulas são personalizadas de acordo com o nível e objetivos de cada aluno. Acredito que todos podem aprender, basta encontrar a abordagem certa!</p>
                </div>
            </div>

            <!-- Avaliações -->
            <div class="profile-section">
                <h2 class="section-title">Avaliações</h2>
                
                <div class="reviews-summary">
                    <div class="reviews-score">
                        <div class="score-number">${avgRating}</div>
                        <div class="score-stars">${'★'.repeat(Math.floor(avgRating))}${'☆'.repeat(5 - Math.floor(avgRating))}</div>
                        <div class="score-count">${teacher.reviews} avaliações</div>
                    </div>
                    <div class="reviews-bars">
                        ${[5, 4, 3, 2, 1].map(star => {
                            const count = ratingDistribution[star - 1];
                            const percentage = reviews.length > 0 ? (count / reviews.length * 100) : 0;
                            return `
                                <div class="rating-bar">
                                    <span class="rating-label">${star} estrelas</span>
                                    <div class="bar-container">
                                        <div class="bar-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <span class="rating-count">${count}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="reviews-list">
                    ${reviews.map(review => `
                        <div class="review-item">
                            <div class="review-header">
                                <span class="review-author">${review.author}</span>
                                <span class="review-date">${review.date}</span>
                            </div>
                            <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                            <p class="review-text">${review.text}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Sidebar -->
        <div class="profile-sidebar">
            <!-- Preço e Agendamento -->
            <div class="sidebar-card price-card">
                <div class="price-amount">R$ ${teacher.price}</div>
                <div class="price-period">por hora</div>
                <button class="btn-book" onclick="openBookingModal(${teacher.id})">Agendar Aula</button>
                <button class="btn-favorite ${isFav ? 'active' : ''}" 
                        data-teacher-id="${teacher.id}"
                        onclick="toggleFavoriteProfile(${teacher.id})">
                    ${isFav ? '❤️ Favoritado' : '🤍 Adicionar aos Favoritos'}
                </button>
            </div>

            <!-- Informações -->
            <div class="sidebar-card">
                <h3 class="section-title" style="font-size: 1.125rem; margin-bottom: 1rem;">Informações</h3>
                <ul class="info-list">
                    <li class="info-item">
                        <span class="info-icon">📚</span>
                        <div class="info-text">
                            <span class="info-label">Categoria</span>
                            <span class="info-value">${getCategoryName(teacher.category)}</span>
                        </div>
                    </li>
                    <li class="info-item">
                        <span class="info-icon">⏱️</span>
                        <div class="info-text">
                            <span class="info-label">Tempo de resposta</span>
                            <span class="info-value">Até 2 horas</span>
                        </div>
                    </li>
                    <li class="info-item">
                        <span class="info-icon">🎓</span>
                        <div class="info-text">
                            <span class="info-label">Alunos ativos</span>
                            <span class="info-value">${Math.floor(teacher.reviews * 0.6)}</span>
                        </div>
                    </li>
                    <li class="info-item">
                        <span class="info-icon">📅</span>
                        <div class="info-text">
                            <span class="info-label">Membro desde</span>
                            <span class="info-value">Janeiro 2023</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    `;

    document.getElementById('profileContent').innerHTML = profileHTML;
}

// Obter nome da categoria
function getCategoryName(category) {
    const categories = {
        'arte': 'Arte',
        'tecnologia': 'Tecnologia',
        'saude': 'Saúde',
        'ciencias': 'Ciências',
        'hobbies': 'Hobbies',
        'idiomas': 'Idiomas'
    };
    return categories[category] || category;
}

// Toggle favorito no perfil
function toggleFavoriteProfile(teacherId) {
    toggleFavorite(teacherId);
    loadTeacherProfile(); // Recarregar para atualizar botão
}

// Abrir modal de agendamento
function openBookingModal(teacherId) {
    const teacher = window.teachersData?.find(t => t.id === teacherId);
    if (!teacher) return;

    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    
    // Armazenar dados do professor no modal
    modal.dataset.teacherId = teacherId;
    modal.dataset.teacherPrice = teacher.price;
    
    // Configurar data mínima (hoje)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    
    // Calcular preços
    updateBookingPrice();
}

// Fechar modal
function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.getElementById('bookingForm').reset();
}

// Atualizar preço do agendamento
function updateBookingPrice() {
    const modal = document.getElementById('bookingModal');
    const pricePerHour = parseFloat(modal.dataset.teacherPrice) || 0;
    const duration = parseFloat(document.getElementById('bookingDuration')?.value) || 1;
    
    const lessonPrice = pricePerHour * duration;
    const platformFee = lessonPrice * 0.1;
    const total = lessonPrice + platformFee;
    
    document.getElementById('lessonPrice').textContent = formatPrice(lessonPrice);
    document.getElementById('platformFee').textContent = formatPrice(platformFee);
    document.getElementById('totalPrice').textContent = formatPrice(total);
}

// Submeter agendamento
function submitBooking(event) {
    event.preventDefault();
    
    const modal = document.getElementById('bookingModal');
    const teacherId = modal.dataset.teacherId;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const duration = document.getElementById('bookingDuration').value;
    const notes = document.getElementById('bookingNotes').value;
    
    // Simular salvamento
    const booking = {
        teacherId,
        date,
        time,
        duration,
        notes,
        createdAt: new Date().toISOString()
    };
    
    // Salvar no localStorage
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Fechar modal e mostrar sucesso
    closeBookingModal();
    showNotification('Aula agendada com sucesso! Em breve você receberá a confirmação.', 'success');
    
    // Opcional: redirecionar para dashboard do aluno
    setTimeout(() => {
        // window.location.href = 'aluno-dashboard.html';
    }, 2000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadTeacherProfile();
    
    // Listener para atualizar preço quando duração mudar
    const durationSelect = document.getElementById('bookingDuration');
    if (durationSelect) {
        durationSelect.addEventListener('change', updateBookingPrice);
    }
    
    // Fechar modal ao clicar fora
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
});

// Exportar funções
if (typeof window !== 'undefined') {
    window.openBookingModal = openBookingModal;
    window.closeBookingModal = closeBookingModal;
    window.submitBooking = submitBooking;
    window.toggleFavoriteProfile = toggleFavoriteProfile;
}
