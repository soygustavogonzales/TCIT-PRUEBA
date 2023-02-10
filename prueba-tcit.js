// Responsables de los cuarteles
const paddockManagers = [
  { id: 1, taxNumber: '132254524', name: 'JUAN TAPIA BURGOS'},
  { id: 2, taxNumber: '143618668', name: 'EFRAIN SOTO VERA'},
  { id: 3, taxNumber: '78903228', name: 'CARLOS PEREZ GONZALEZ'},
  { id: 4, taxNumber: '176812737', name: 'ANDRES VIÑALES CIENFUEGOS'},
  { id: 5, taxNumber: '216352696', name: 'OSCAR PEREZ ZUÑIGA'},
  { id: 6, taxNumber: '78684747', name: 'JOAQUIN ANDRADE SANDOVAL' }
];

// Tipo de cuartel, en el cual se utiliza el tipo de producto plantado
const paddockType = [
  { id: 1, name: 'PALTOS' },
  { id: 2, name: 'AVELLANOS' },
  { id: 3, name: 'CEREZAS' },
  { id: 4, name: 'NOGALES' },
]

// Un paddock representa un cuartel de un campo (Entiéndase también como potrero o parcela), el área está representada en m2, harvestYear es el año en el que se sembró el cuartel
const paddocks = [
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 1200 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 4, harvestYear: 2019, area: 500 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 20000 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 3, harvestYear: 2021, area: 8401},
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2020, area: 2877 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 2, harvestYear: 2017, area: 15902 },
  { paddockManagerId: 3, farmId: 3, paddockTypeId: 2, harvestYear: 2018, area: 1736 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2020, area: 2965 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 4, harvestYear: 2018, area: 1651 },
  { paddockManagerId: 5, farmId: 1, paddockTypeId: 1, harvestYear: 2018, area: 700 },
  { paddockManagerId: 1, farmId: 2, paddockTypeId: 1, harvestYear: 2019, area: 7956 },
  { paddockManagerId: 5, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 3745 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 3, harvestYear: 2021, area: 11362 },
  { paddockManagerId: 2, farmId: 3, paddockTypeId: 3, harvestYear: 2021, area: 300 },
  { paddockManagerId: 3, farmId: 2, paddockTypeId: 2, harvestYear: 2020, area: 19188 },
  { paddockManagerId: 3, farmId: 1, paddockTypeId: 1, harvestYear: 2019, area: 17137 },
  { paddockManagerId: 4, farmId: 3, paddockTypeId: 2, harvestYear: 2020, area: 100 },
  { paddockManagerId: 2, farmId: 1, paddockTypeId: 3, harvestYear: 2019, area: 11845 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 1, harvestYear: 2018, area: 15969 },
  { paddockManagerId: 1, farmId: 3, paddockTypeId: 1, harvestYear: 2029, area: 10420 },
  { paddockManagerId: 5, farmId: 2, paddockTypeId: 3, harvestYear: 2010, area: 3200 },
  { paddockManagerId: 6, farmId: 1, paddockTypeId: 2, harvestYear: 2012, area: 10587 },
  { paddockManagerId: 2, farmId: 2, paddockTypeId: 2, harvestYear: 2018, area: 16750 }
];

const farms = [
  { id: 1, name: 'AGRICOLA SANTA ANA' },
  { id: 2, name: 'VINA SANTA PAULA' },
  { id: 3, name: 'FORESTAL Y AGRICOLA LO ENCINA' }
];

// Tip: Una hectárea equivale a 10.000m2

// 0 Arreglo con los ids de los responsables de cada cuartel
function listPaddockManagerIds() {
  return paddockManagers.map((paddockManager) => paddockManager.id);
};

// 1 Arreglo con los ruts de los responsables de los cuarteles, ordenados por nombre
function listPaddockManagersByName() {
  return paddockManagers.sort((a , b)=> a.name.localeCompare(b.name))
  .map(paddockManager => paddockManager.taxNumber)
};

// 2 Arreglo con los nombres de cada tipo de cultivo, ordenados decrecientemente por la suma TOTAL de la cantidad de hectáreas plantadas de cada uno de ellos.
function sortPaddockTypeByTotalArea() {
  return paddockType.map(pdt => {
    const paddocksByType = paddocks.filter(i => i.paddockTypeId === pdt.id).map(j => j.area).reduce((acum, currentVal) => acum + currentVal, 0)
    return {
        name:pdt.name,paddocksByType
    }
  }).sort((a , b) => a.paddocksByType - b.paddocksByType).map(k => k.name)
}

// 3 Arreglo con los nombres de los administradores, ordenados decrecientemente por la suma TOTAL de hectáreas que administran.
function sortFarmManagerByAdminArea() {
  return paddockManagers.map(pdm => {
    const totalAreaByManager = paddocks.filter(p => p.paddockManagerId === pdm.id).map(j => j.area).reduce((acum, currentVal) => acum + currentVal, 0)
    return {
        name:pdm.name, totalAreaByManager
    }
  }).sort((a , b) => a.totalAreaByManager  - b.totalAreaByManager).map(k => k.name)
}

// 4 Objeto en que las claves sean los nombres de los campos y los valores un arreglo con los ruts de sus administradores ordenados alfabéticamente por nombre.
function farmManagerNames() {

    const o = new Object()
    farms.forEach(f => {
        let uniq = []
        let rutsByFarm = paddocks.filter(p => p.farmId === f.id)
                        .map(i => i.paddockManagerId)
                        .map(managerId => paddockManagers.filter(pdm => pdm.id === managerId).map( m => m.taxNumber)
                          ).map(e => e[0])
        //validating duplicates
        rutsByFarm.forEach(r => {
            if(uniq.indexOf(r) < 0) {
                uniq.push(r)
            }
        })
        o[f.name] = uniq

    })
    return o;
}

// 5 Arreglo ordenado decrecientemente con los m2 totales de cada campo que tengan más de 2 hectáreas en Paltos
function biggestAvocadoFarms() {
    
    return farms.map(f => {
        const totalArea = paddocks.filter(p => (p.farmId === f.id && p.paddockTypeId === 1)).map(pd => pd.area).reduce((acum, currentV) => acum + currentV, 0)
        return totalArea
    }).filter(area => area > 2*10000).sort((a,b)=> b - a)

    //return paddocks.filter(p => p.area > 2*10000).map(p => p.area)

}

// 6 Arreglo con nombres de los administradores de la FORESTAL Y AGRÍCOLA LO ENCINA, ordenados por nombre, que trabajen más de 1000 m2 de Cerezas
function biggestCherriesManagers() {
  return paddocks.filter( p => (p.paddockTypeId === 3 && p.farmId === 3 && p.area > 1000) ).map(pd => pd.paddockManagerId).map(pdmId => paddockManagers.find(pdm => pdm.id === pdmId)).map(pdm => pdm.name).sort((a , b)=> a.localeCompare(b))
}

// 7 Objeto en el cual las claves sean el nombre del administrador y el valor un arreglo con los nombres de los campos que administra, ordenados alfabéticamente
function farmManagerPaddocks() {
    const o = new Object();
  paddockManagers.forEach(pdm => {
    const paddocksByMngr = paddocks.filter(p => p.paddockManagerId === pdm.id).map(pd => pd.farmId)
    o[pdm.name] = [...new Set(paddocksByMngr)].map( farmId => {
        const farmName = farms.find(f => f.id === farmId).name
        return farmName
    });
  })
  
  return o;
}

// 8 Objeto en que las claves sean el tipo de cultivo concatenado con su año de plantación (la concatenación tiene un separador de guión ‘-’, por ejemplo AVELLANOS-2020) y el valor otro objeto en el cual la clave sea el id del administrador y el valor el nombre del administrador
function paddocksManagers() {
  const o = new Object();
  paddocks.forEach(p => {
    const paddockName = paddockType.find(pt => pt.id === p.paddockTypeId).name
    const paddockMngr = paddockManagers.find(pm => pm.id === p.paddockManagerId)
    const managerData = new Object()
    managerData[paddockMngr.id] = paddockMngr.name;
    o[paddockName+'-'+p.harvestYear] = managerData
  })
  return o;
}

// 9 Agregar nuevo administrador con datos ficticios a "paddockManagers" y agregar un nuevo cuartel de tipo NOGALES con 900mts2, año 2017 de AGRICOLA SANTA ANA, administrado por este nuevo administrador 
// Luego devolver el lugar que ocupa este nuevo administrador en el ranking de la pregunta 3.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newManagerRanking() {

    const paddockManagers_ = Object.assign([], paddockManagers);
    paddockManagers_.push({
        id:7,
        taxNumber:'116352690',
        name:'TEST FIELD'
    })

    const paddocks_ = Object.assign([], paddocks);
    paddocks_.push({
        paddockManagerId:7,
        paddockTypeId:4,
        harvestYear:2017,
        farmId:1
    })

    return paddockManagers_.map(pdm => {
        const totalAreaByManager = paddocks_.filter(p => p.paddockManagerId === pdm.id).map(j => j.area).reduce((acum, currentVal) => acum + currentVal, 0)
        return {
            name:pdm.name, totalAreaByManager
        }
      }).sort((a , b) => a.totalAreaByManager  - b.totalAreaByManager).map(k => k.name).map((pdm_, index) => pdm_+ " en la posicion:  "+ index).filter(i => i.includes('TEST FIELD'))

}


// No modificar, eliminar o alterar cualquier línea de código o comentario de acá para abajo
// Cualquier cambio hará que su prueba quede invalidada automáticamente
console.log('Pregunta 0');
console.log(listPaddockManagerIds());
console.log('Pregunta 1');
console.log(listPaddockManagersByName());
console.log('Pregunta 2');
console.log(sortPaddockTypeByTotalArea());
console.log('Pregunta 3');
console.log(sortFarmManagerByAdminArea());
console.log('Pregunta 4');
console.log(farmManagerNames());
console.log('Pregunta 5');
console.log(biggestAvocadoFarms());
console.log('Pregunta 6');
console.log(biggestCherriesManagers());
console.log('Pregunta 7');
console.log(farmManagerPaddocks());
console.log('Pregunta 8');
console.log(paddocksManagers());
console.log('Pregunta 9');
console.log(newManagerRanking());

