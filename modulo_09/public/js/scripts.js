const Mask = {
  apply(input, func) {
    setTimeout(function () {
      input.value = Mask[func](input.value);
    }, 1);
  },

  formatBRL(value) {
    value = value.replace(/\D/g, '');

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);
  },

  cpfCNPJ(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 14) {
      value = value.slice(0, -1);
    }

    if (value.length > 11) {
      value = value.replace(/(\d{2})(\d)/, '$1.$2');

      value = value.replace(/(\d{3})(\d)/, '$1.$2');

      value = value.replace(/(\d{3})(\d)/, '$1/$2');

      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');

      value = value.replace(/(\d{3})(\d)/, '$1.$2');

      value = value.replace(/(\d{3})(\d)/, '$1-$2');
    }

    return value;
  },

  cep(value) {
    value = value.replace(/\D/g, '');

    if (value.length > 8) {
      value = value.slice(0, -1);
    }

    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    return value;
  },
};

const PhotosUpload = {
  input: '',

  preview: document.querySelector('#photos_preview'),

  uploadLimit: 6,

  files: [],

  handleFileInput(event) {
    const { files: fileList } = event.target;

    PhotosUpload.input = event.target;

    if (PhotosUpload.hasLimit(event)) {
      return;
    }

    Array.from(fileList).forEach((file) => {
      PhotosUpload.files.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();
        image.src = String(reader.result);

        const container = PhotosUpload.getContainer(image);

        PhotosUpload.preview.appendChild(container);
      };

      reader.readAsDataURL(file);
    });

    PhotosUpload.input.files = PhotosUpload.getAllFiles();
  },

  hasLimit(event) {
    const { uploadLimit, input: filesList } = PhotosUpload;

    if (filesList.length > uploadLimit) {
      alert(`Envie no máximo ${uploadLimit} fotos`);
      event.preventDefault();
      return true;
    }

    return false;
  },

  getAllFiles() {
    const dataTransfer =
      new ClipboardEvent('').clipboardData || new DataTransfer();

    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));

    return dataTransfer.files;
  },

  getContainer(image) {
    const container = document.createElement('div');
    container.classList.add('photo');

    container.onclick = PhotosUpload.removePhoto;

    container.appendChild(image);

    container.appendChild(PhotosUpload.getRemoveButton());

    return container;
  },

  getRemoveButton() {
    const button = document.createElement('i');
    button.classList.add('material-icons');
    button.innerHTML = 'delete';

    return button;
  },

  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);

    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();

    photoDiv.remove();
  },

  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;

    if (photoDiv.id) {
      const removedFiles = document.querySelector(
        "input[name='removed_files']",
      );
      if (removedFiles) {
        removedFiles.value += `${photoDiv.id},`;
      }
    }

    photoDiv.remove();
  },
};

const ImageGallery = {
  highlight: document.querySelector('.gallery .highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),

  setImage(e) {
    const { target } = e;

    ImageGallery.previews.forEach((preview) => {
      preview.classList.remove('active');
    });

    target.classList.add('active');

    ImageGallery.highlight.src = target.src;
    Lightbox.image.src = target.src;
  },
};

const Lightbox = {
  target: document.querySelector('.lightbox-target'),
  image: document.querySelector('.lightbox-target img'),
  closeButton: document.querySelector('.lightbox-target i.lightbox-close'),

  open() {
    Lightbox.target.style.opacity = 1;
    Lightbox.target.style.top = 0;
    Lightbox.target.style.bottom = 0;
    Lightbox.closeButton.style.top = 0;
  },

  close() {
    Lightbox.target.style.opacity = 0;
    Lightbox.target.style.top = '-100%';
    Lightbox.target.style.bottom = 'initial';
  },
};

const Validate = {
  apply(input, func) {
    Validate.clearErrors(input);

    let result = Validate[func](input.value);
    input.value = result.value;

    if (result.error) {
      Validate.displayError(input, result.error);
    }
  },

  displayError(input, error) {
    const div = document.createElement('div');
    div.classList.add('error');
    div.innerHTML = error;
    input.parentNode.appendChild(div);
    // input.focus();
  },

  clearErrors(input) {
    const errorDiv = input.parentNode.querySelector('.error');

    if (errorDiv) {
      errorDiv.remove();
    }
  },

  isEmail(value) {
    let error = null;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value.match(mailFormat)) {
      error = 'Email inválido';
    }

    return {
      error,
      value,
    };
  },

  isCpfCNPJ(value) {
    let error = null;

    const cleanValues = value.replace(/\D/g, '');

    if (cleanValues.length > 11 && cleanValues.length !== 14) {
      error = 'CNPJ incorreto';
    } else if (cleanValues.length < 12 && cleanValues.length !== 11) {
      error = 'CPF incorreto';
    }

    return {
      error,
      value,
    };
  },

  isCEP(value) {
    let error = null;

    const cleanValues = value.replace(/\D/g, '');

    if (cleanValues.length !== 8) {
      error = 'CEP incorreto';
    }

    return {
      error,
      value,
    };
  },

  allFields(event) {
    const items = document.querySelectorAll(
      ' .item input, .item select, .item textarea ',
    );

    for (item of items) {
      if (item.value == '') {
        const message = document.createElement('div');
        message.classList.add('message');
        message.classList.add('error');
        message.style.position = 'fixed';
        message.innerHTML = 'Todos os campos são obrigatórios.';
        document.querySelector('body').append(message);

        event.preventDefault();
      }
    }
  },
};
