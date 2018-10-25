var hanoi = function(disc,src,aux,dst){
  if(disc > 0){
    hanoi(disc-1,src,dst,aux);

    // disc;
    // src;
    // aux;
    // dst;
    console.log(disc, 'disc');
  //   document.writeln('Move disc '+disc+' from '+src+' to '+dst);
  //   hanoi(disc-1,aux,src,dst);
  }
};
hanoi(3,'Src','Aux','Dst');
