import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const projectForm = document.getElementById('project-form');
  const projectsContainer = document.getElementById('projects-container');

  projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const materials = document.getElementById('materials').value.split(',').map(m => m.trim());

    try {
      await backend.addProject(title, description, materials);
      alert('Project added successfully!');
      projectForm.reset();
      await loadProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project. Please try again.');
    }
  });

  async function loadProjects() {
    try {
      const projects = await backend.getAllProjects();
      displayProjects(projects);
    } catch (error) {
      console.error('Error loading projects:', error);
      projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
    }
  }

  function displayProjects(projects) {
    projectsContainer.innerHTML = '';
    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.className = 'project';
      projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Materials:</strong> ${project.materials.join(', ')}</p>
        <div class="votes">
          <button onclick="upvote(${project.id})">👍 ${project.upvotes}</button>
          <button onclick="downvote(${project.id})">👎 ${project.downvotes}</button>
        </div>
      `;
      projectsContainer.appendChild(projectElement);
    });
  }

  window.upvote = async (id) => {
    try {
      await backend.upvoteProject(id);
      await loadProjects();
    } catch (error) {
      console.error('Error upvoting project:', error);
    }
  };

  window.downvote = async (id) => {
    try {
      await backend.downvoteProject(id);
      await loadProjects();
    } catch (error) {
      console.error('Error downvoting project:', error);
    }
  };

  await loadProjects();
});
