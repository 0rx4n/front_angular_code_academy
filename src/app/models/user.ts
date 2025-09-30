// src/app/models/user.ts
export interface User {
  id?: string;           // MockAPI avtomatik verir
  login: string;         // istifadəçi login
  parol: string;         // istifadəçi parolu
  name: string;          // ad
  last_name: string;     // soyad
  phone: string | number;// telefon (string saxlamaq daha rahatdır)
  mail: string;          // email
  token: string;         // sadə token (name+last_name+mail)
  role?: string;         // "role 1" → admin, "role 2" → user (optional)
  ads: string[];        // istifadəçinin elan ID-ləri
  favorites: string[];    //istifadəçinin seçilmiş elanları   
  createdAt: string;     // qeydiyyat tarixi
}
