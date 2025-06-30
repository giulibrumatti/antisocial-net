const Acerca = () => {
  return (
    <div className="container py-5 bg-white rounded shadow-sm">
      <h2 className="mb-3">Acerca de AntiSocial Net</h2>
      <p>AntiSocial Net es una red social educativa inspirada en X (antes Twitter), creada como proyecto para aplicar lo aprendido en clase sobre desarrollo web con React, TypeScript y Bootstrap.</p>

      <h5 className="mt-4">Objetivo</h5>
      <p>El proyecto busca simular el funcionamiento básico de una red social: login de usuarios, creación de publicaciones, comentarios y navegación entre secciones. Todo esto respetando las buenas prácticas de programación y diseño responsivo.</p>

      <h5 className="mt-4">Tecnologías utilizadas</h5>
      <ul>
        <li>React con hooks (`useState`, `useEffect`)</li>
        <li>React Router DOM para navegación interna</li>
        <li>Bootstrap y React-Bootstrap para diseño</li>
        <li>TypeScript para tipado estricto</li>
        <li>Fetch API para conexión con el backend</li>
      </ul>

      <h5 className="mt-4">Equipo</h5>
      <p>Este proyecto fue desarrollado por estudiantes como parte del trabajo práctico integrador. Cada integrante participó en componentes clave como login, home, diseño, API y más.</p>
    </div>
  );
};

export default Acerca;
