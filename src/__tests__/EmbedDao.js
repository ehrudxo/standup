import getEmbedly from '../EmbedlyDao';
it('Get Embedly Info From Embedly', () => {
  getEmbedly("http://www.naver.com").then((response)=>{
    expect(response.data.url).toEqual("http://www.naver.com");
  }).catch((error)=>{
    console.log(error);
  });
});
