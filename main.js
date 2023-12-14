var rotationOn = false;



// Reusable function for setting up sliders
function setupSlider(sliderId, outputId) {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(outputId);
    var value;

    // Initialize value and set initial HTML
    value = parseFloat(slider.value);
    output.innerHTML = value;

    // Update the displayed value on slider input
    slider.oninput = function () {
        value = parseFloat(this.value);
        output.innerHTML = value;
        console.log(`${outputId} Value: `, value);
    }
    return {
        getValue: function () {
            return value;
        }
    };
}

// Setup each slider using the reusable function
var metallicSlider = setupSlider("metallicRange", "metallicOutput");
var roughnessSlider = setupSlider("roughnessRange", "roughnessOutput");
var ambientOcclusionSlider = setupSlider("ambientOcclusionRange", "ambientOcclusionOutput");


const colors = { red: [255, 0, 0], green: [0, 255, 0], blue: [0, 0, 255], orange: [255, 165, 0], purple: [255, 0, 255] };


async function toggleRotate(){
    rotationOn = !rotationOn; // Bascule l'état de la rotation

    if (rotationOn) {
      // Démarrer l'animation de rotation
      SDK3DVerse.engineAPI.playAnimationSequence(
        "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
      );
      btnToggleRotateLeft.innerText = "Stop Rotation";
    } else {
      // Arrêter l'animation de rotation
      SDK3DVerse.engineAPI.pauseAnimationSequence(
        "19895069-14e2-4bb5-bf23-d958ee630b1d" // Remplacez par l'UUID de votre séquence d'animation
      );
      btnToggleRotateLeft.innerText = "Start Rotation";
    }
}

// Entity selection
async function selectEntity(event) {
    const keepOldSelection = event.ctrlKey;
    const { entity } = await SDK3DVerse.engineAPI.castScreenSpaceRay(event.clientX, event.clientY, true, keepOldSelection);

    if (entity) {
        console.log('Selected entity', entity.getName());
        desc(entity);
    } else {
        console.log('No entity selected');
    }
}

// Function to modify color called in the color buttons
async function colorPicking(color) {
    return colorPicked = color;
    console.log(colorPicked);
}

async function ARM(entity) {
    entity.setComponent('material', {
        dataJSON: {
            metallic: metallicSlider.getValue(),
            roughness: roughnessSlider.getValue(),
            ambientOcclusion: ambientOcclusionSlider.getValue(),
        }
    });
    console.log(entity.getComponent('material'));
}

async function desc(entity) {
    entity.setComponent('material', {
        dataJSON: {
            albedo: colorPicked,
            metallic: metallicSlider.getValue(),
            roughness: roughnessSlider.getValue(),
            ambientOcclusion: ambientOcclusionSlider.getValue(),
        }
    })
}

// Initialization
async function InitApp() {
    await SDK3DVerse.joinOrStartSession({
        userToken: "public_xhZv-SrH0o7c9Xhz",
        sceneUUID: "17fc8919-6b02-4835-a21c-8f67bafb94ca",
        canvas: document.getElementById("display-canvas"),
        viewportProperties: {
            defaultControllerType: SDK3DVerse.controller_type.orbit,
        },
        connectToEditor: true,
    });

    SDK3DVerse.notifier.on('onEntitySelectionChanged', (selectedEntities, unselectedEntities) => {
        console.log('Selected', selectedEntities);
        console.log('Unselected', unselectedEntities);
    });

    document.getElementById("display-canvas").addEventListener('click', selectEntity);
}

window.addEventListener("load", InitApp);
