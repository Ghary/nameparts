;(function(root) {
    'use strict';

    var SALUTATIONS = {
        'MR': 1, 'MS': 1, 'MRS': 1, 'DR': 1, 'MISS': 1, 'DOCTOR': 1, 'CORP': 1, 'SGT': 1, 'PVT': 1, 'JUDGE': 1,
        'CAPT': 1, 'COL': 1, 'MAJ': 1, 'LT': 1, 'LIEUTENANT': 1, 'PRM': 1, 'PATROLMAN': 1, 'HON': 1,
        'OFFICER': 1, 'REV': 1, 'PRES': 1, 'PRESIDENT': 1,
        'GOV': 1, 'GOVERNOR': 1, 'VICE PRESIDENT': 1, 'VP': 1, 'MAYOR': 1, 'SIR': 1, 'MADAM': 1, 'HONERABLE': 1
    };

    var GENERATIONS = {
        'JR': 1, 'SR': 1, 'I': 1, 'II': 1, 'III': 1, 'IV': 1, 'V': 1, 'VI': 1, 'VII': 1, 'VIII': 1, 'IX': 1, 'X': 1,
        '1ST': 1, '2ND': 1, '3RD': 1, '4TH': 1, '5TH': 1, '6TH': 1, '7TH': 1, '8TH': 1, '9TH': 1, '10TH': 1,
        'FIRST': 1, 'SECOND': 1, 'THIRD': 1, 'FOURTH': 1, 'FIFTH': 1, 'SIXTH': 1, 'SEVENTH': 1,
        'EIGHTH': 1, 'NINTH': 1, 'TENTH': 1
    };

    var SUFFIXES = {'ESQ': 1, 'PHD': 1, 'MD': 1};

    var LNPREFIXES = {
        'DE': 1, 'DA': 1, 'DI': 1, 'LA': 1, 'DU': 1, 'DEL': 1, 'DEI': 1, 'VDA': 1, 'DELLO': 1, 'DELLA': 1,
        'DEGLI': 1, 'DELLE': 1, 'VAN': 1, 'VON': 1, 'DER': 1, 'DEN': 1, 'HEER': 1, 'TEN': 1, 'TER': 1,
        'VANDE': 1, 'VANDEN': 1, 'VANDER': 1, 'VOOR': 1, 'VER': 1, 'AAN': 1, 'MC': 1, 'BEN': 1, 'SAN': 1,
        'SAINZ': 1, 'BIN': 1, 'LI': 1, 'LE': 1, 'DES': 1, 'AM': 1, 'AUS\'M': 1, 'VOM': 1, 'ZUM': 1, 'ZUR': 1, 'TEN': 1, 'IBN': 1
    };

    var NON_NAME = {'AKA': 1, 'FKA': 1, 'NKA': 1, 'FICTITIOUS': 1};

    var CORP_ENTITY = {
        'NA': 1, 'CORP': 1, 'CO': 1, 'INC': 1, 'ASSOCIATES': 1, 'SERVICE': 1, 'LLC': 1, 'LLP': 1, 'PARTNERS': 1,
        'RA': 1, 'CO': 1, 'COUNTY': 1, 'STATE': 1,
        'BANK': 1, 'GROUP': 1, 'MUTUAL': 1, 'FARGO': 1
    };

    var SUPPLEMENTAL_INFO = {'WIFE OF': 1, 'HUSBAND OF': 1, 'SON OF': 1, 'DAUGHTER OF': 1, 'DECEASED': 1};

    var reUnwantedChars = /[\.,\/\\]/gi;
    var reConsecutiveSpaces = /\s{2,}/;

    function parse (name) {
        var modifiedName = name;
        var output = {
            fullName: name,

            salutation: null,
            firstName: null,
            middleName: null,
            lastName: null,
            generation: null,
            suffix: null,
            aliases: null,

            hasCorporateEntity: null,
            hasNonName: null,
            hasLnPrefix: null,
            hasSupplementalInfo: null
        };

        // Remove unwanted characters
        modifiedName = modifiedName.replace(reUnwantedChars, '');

        // Remove any consecutive spaces
        modifiedName = modifiedName.replace(reConsecutiveSpaces, ' ');

        // Split the name into parts
        var namePieces = modifiedName.split(' ');

        // Test each name piece
        var namePiecesIndex = 0;
        while (namePiecesIndex < namePieces.length) {
            var namePiece = namePieces[namePiecesIndex];
            var namePieceUpperCase = namePiece.toUpperCase();

            // Ignore these words
            if (namePiece.toLowerCase() === 'the') {
                namePieces.splice(namePiecesIndex, 1);
                continue;
            }

            // Salutation?
            if (output.salutation === null && SALUTATIONS.hasOwnProperty(namePieceUpperCase)) {
                output.salutation = namePiece;
                namePieces.splice(namePiecesIndex, 1);
            }

            // Generation?
            if (output.generation === null && GENERATIONS.hasOwnProperty(namePieceUpperCase)) {
                output.generation = namePiece;
                namePieces.splice(namePiecesIndex, 1);
            }

            // Suffix?
            if (output.suffix === null && SUFFIXES.hasOwnProperty(namePieceUpperCase)) {
                output.suffix = namePiece;
                namePieces.splice(namePiecesIndex, 1);
            }

            // Has LN Prefix?
            if (output.hasLnPrefix !== true) {
                output.hasLnPrefix = LNPREFIXES.hasOwnProperty(namePieceUpperCase) && namePiecesIndex !== 0;
                if (output.hasLnPrefix === true) {
                    namePieces[namePiecesIndex] += ' ' + namePieces[namePiecesIndex + 1];
                    namePieces.splice(namePiecesIndex + 1, 1);
                }
            }

            // Is a non-name piece?
            var namePieceIsNonName = false;
            if (namePiece.indexOf('\'') === 0 || namePiece.indexOf('"') === 0) {
                // TODO - Match only the correct apostrophe
                // TODO - Don't modify namePieces unless we know for sure we have a matching end apostrophe,
                //        otherwise we have another situation, not a non-name
                while (
                    !(
                        namePiece.substring(namePiece.length - 1) === '\'' ||
                        namePiece.substring(namePiece.length - 1) === '"'
                    )
                ) {
                    namePieces[namePiecesIndex] += ' ' + namePieces[namePiecesIndex + 1];
                    namePieces.splice(namePiecesIndex + 1, 1);
                    namePiece = namePieces[namePiecesIndex];
                }
                output.hasNonName = true;
                namePieceIsNonName = true;
                namePiece = namePiece.substring(1, namePiece.length - 1);
            } else if (NON_NAME.hasOwnProperty(namePieceUpperCase)) {
                output.hasNonName = true;
                namePieceIsNonName = true;
                namePiece = namePieces[namePiecesIndex + 1];
                namePieces.splice(namePiecesIndex, 1);

                if (namePiece.toLowerCase() === 'the') {
                    namePieces[namePiecesIndex] += ' ' + namePieces[namePiecesIndex + 1];
                    namePieces.splice(namePiecesIndex + 1, 1);
                    namePiece = namePieces[namePiecesIndex];
                }
            } else if (output.hasNonName === null) {
                output.hasNonName = false;
            }

            if (namePieceIsNonName === true) {
                if (output.aliases === null) {
                    output.aliases = [];
                }

                output.aliases.push(namePiece);
                namePieces.splice(namePiecesIndex, 1);
            }

            // Has corporate entity?
            if (output.hasCorporateEntity !== true) {
                output.hasCorporateEntity = CORP_ENTITY.hasOwnProperty(namePieceUpperCase);
            }

            // Has supplemental info?
            if (output.hasSupplementalInfo !== true) {
                output.hasSupplementalInfo = SUPPLEMENTAL_INFO.hasOwnProperty(namePieceUpperCase);

                if (output.hasSupplementalInfo === true) {
                    namePieces.splice(namePiecesIndex, 1);
                }
            }

            // Increment index
            namePiecesIndex++;
        }

        // First Name
        output.firstName = namePieces[0]; // TODO - What if the array is empty?
        namePieces.splice(0, 1);

        // The rest
        if (namePieces.length > 1) {
            output.middleName = namePieces.splice(0, namePieces.length - 1).join(' ');
        }

        // Last Name
        output.lastName = namePieces[0];

        // Return parsed information
        return output;
    };

    // Export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = parse;
        module.exports.parse = parse;
    } else {
        // Save to either 'window' or 'global'
        root.NameParts = parse;
        root.NameParts.parse = parse;
    }
})(this);
