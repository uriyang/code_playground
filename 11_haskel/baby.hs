doubleMe x = x + x
-- doubleUs x y = x * 2 + y * 2
doubleUS x y = doubleMe x + doubleMe y
doubleSmallNumber x = if x > 100 
  then x 
  else x*2
boomBangs xs = [if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]
length' xs = sum [1 | _ <- xs]
removeNonUppercase st = [c | c <- st, c `elem` ['A'..'Z']]