const PathName = () => {
  const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
  
  const pathName = currentPath.split('/')[0].replace(/-/g, ' ');
  
  return pathName;
};

export default PathName;
