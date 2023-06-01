const formatUrlWithHttp = (url) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `http://${nonSchemmaUrl}`
  );
export default formatUrlWithHttp;
