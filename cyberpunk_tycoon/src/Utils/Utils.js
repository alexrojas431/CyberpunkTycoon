export function hitTest(s1, s2){

    //s1 = s1.getBounds();
    //s2 = s2.getBounds();
	
    if ((s1.x-s1.width/2) + (s1.width/2) > (s2.x-s2.width/2))
       if ((s1.x-s1.width/2) < (s2.x-s2.width/2) + (s2.width/2))
           if ((s1.y-s1.height/2) + (s1.height/2) > (s2.y-s2.height/2))
               if ((s1.y-s1.height/2) < (s2.y-s2.height/2) + (s2.height/2))
                   return true;

   return false;
}