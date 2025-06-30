const Ayuda = () => {
  return (
    <div className="container py-5 bg-white rounded shadow-sm">
      <h2 className="mb-3">Centro de Ayuda</h2>
      <p>Bienvenido al Centro de Ayuda de AntiSocial Net. Estamos acá para ayudarte a tener la mejor experiencia posible en nuestra plataforma.</p>
      
      <h5 className="mt-4">Preguntas frecuentes</h5>
      <ul>
        <li><strong>¿Cómo creo una cuenta?</strong> Hacé clic en “Registrarse” en el menú y completá tus datos.</li>
        <li><strong>Olvidé mi contraseña, ¿qué hago?</strong> En la pantalla de login, hacé clic en “¿Olvidaste tu contraseña?” (próximamente).</li>
        <li><strong>¿Puedo borrar mis publicaciones?</strong> Sí, desde tu perfil podés gestionar todos tus posts.</li>
      </ul>

      <h5 className="mt-4">¿Necesitás más ayuda?</h5>
      <p>Escribinos a <a href="mailto:soporte@antisocialnet.com">soporte@antisocialnet.com</a> y te responderemos dentro de las 48 horas hábiles.</p>
    </div>
  );
};

export default Ayuda;

