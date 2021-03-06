import 'jasmine';
import {parse} from '../src/nameparts';

describe('NameParts.js', function() {
    it('should load', function() {
        expect(typeof parse).toBe('function');
    });

    describe('parse()', function() {
        it('should parse a simple name', function() {
            let nameParts = parse('John Jacob');

            // Parse results
            expect(nameParts.fullName).toBe('John Jacob');
            expect(nameParts.firstName).toBe('John');
            expect(nameParts.lastName).toBe('Jacob');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a simple name, whose first name matches a LN Prefix', function() {
            let nameParts = parse('Ben Franklin');

            // Parse results
            expect(nameParts.fullName).toBe('Ben Franklin');
            expect(nameParts.firstName).toBe('Ben');
            expect(nameParts.lastName).toBe('Franklin');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a simple name with a single middle name', function() {
            let nameParts = parse('Neil Patrick Harris');

            // Parse results
            expect(nameParts.fullName).toBe('Neil Patrick Harris');
            expect(nameParts.firstName).toBe('Neil');
            expect(nameParts.middleName).toBe('Patrick');
            expect(nameParts.lastName).toBe('Harris');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a spaced surname', function() {
            var nameParts = parse('Otto Von Bismark');

            // Parse results
            expect(nameParts.fullName).toBe('Otto Von Bismark');
            expect(nameParts.firstName).toBe('Otto');
            expect(nameParts.lastName).toBe('Von Bismark');
            expect(nameParts.hasLnPrefix).toBe(true);

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse an apostrophe surname', function() {
            var nameParts = parse('Scarlett O\'Hara');

            // Parse results
            expect(nameParts.fullName).toBe('Scarlett O\'Hara');
            expect(nameParts.firstName).toBe('Scarlett');
            expect(nameParts.lastName).toBe('O\'Hara');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a generation name', function() {
            var nameParts = parse('Thurston Howell III');

            // Parse results
            expect(nameParts.fullName).toBe('Thurston Howell III');
            expect(nameParts.firstName).toBe('Thurston');
            expect(nameParts.lastName).toBe('Howell');
            expect(nameParts.generation).toBe('III');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a generation name designated by the word "the"', function() {
            var nameParts = parse('Thurston Howell the 3rd');

            // Parse results
            expect(nameParts.fullName).toBe('Thurston Howell the 3rd');
            expect(nameParts.firstName).toBe('Thurston');
            expect(nameParts.lastName).toBe('Howell');
            expect(nameParts.generation).toBe('3rd');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a generation name designated by the spelled out word', function() {
            var nameParts = parse('Thurston Howell Third');

            // Parse results
            expect(nameParts.fullName).toBe('Thurston Howell Third');
            expect(nameParts.firstName).toBe('Thurston');
            expect(nameParts.lastName).toBe('Howell');
            expect(nameParts.generation).toBe('Third');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a generation name designated by the word "the" and the spelled out generation', function() {
            var nameParts = parse('Thurston Howell the Third');

            // Parse results
            expect(nameParts.fullName).toBe('Thurston Howell the Third');
            expect(nameParts.firstName).toBe('Thurston');
            expect(nameParts.lastName).toBe('Howell');
            expect(nameParts.generation).toBe('Third');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a single alias name', function() {
            var nameParts = parse('Bruce Wayne a/k/a Batman');

            // Parse results
            expect(nameParts.fullName).toBe('Bruce Wayne a/k/a Batman');
            expect(nameParts.firstName).toBe('Bruce');
            expect(nameParts.lastName).toBe('Wayne');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('Batman');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a nick name with one word', function() {
            var nameParts = parse('"Stonecold" Steve Austin');

            // Parse results
            expect(nameParts.fullName).toBe('"Stonecold" Steve Austin');
            expect(nameParts.firstName).toBe('Steve');
            expect(nameParts.lastName).toBe('Austin');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('Stonecold');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a nick name with two word', function() {
            var nameParts = parse('Dwayne "The Rock" Johnson');

            // Parse results
            expect(nameParts.fullName).toBe('Dwayne "The Rock" Johnson');
            expect(nameParts.firstName).toBe('Dwayne');
            expect(nameParts.lastName).toBe('Johnson');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('The Rock');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a nick name with many spaces', function() {
            var nameParts = parse('"The Nature Boy" Ric Flair');

            // Parse results
            expect(nameParts.fullName).toBe('"The Nature Boy" Ric Flair');
            expect(nameParts.firstName).toBe('Ric');
            expect(nameParts.lastName).toBe('Flair');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('The Nature Boy');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a multiple aliases', function() {
            var nameParts = parse('"The People\'s Champion" Mohammed "Louisville Lip" Ali aka The Greatest');

            // Parse results
            expect(nameParts.fullName).toBe('"The People\'s Champion" Mohammed "Louisville Lip" Ali aka The Greatest');
            expect(nameParts.firstName).toBe('Mohammed');
            expect(nameParts.lastName).toBe('Ali');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('The People\'s Champion');
            expect(nameParts.aliases[1]).toBe('Louisville Lip');
            expect(nameParts.aliases[2]).toBe('The Greatest');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse supplemental information', function() {
            var nameParts = parse('Philip Francis "The Scooter" Rizzuto, deceased');

            // Parse results
            expect(nameParts.fullName).toBe('Philip Francis "The Scooter" Rizzuto, deceased');
            expect(nameParts.firstName).toBe('Philip');
            expect(nameParts.middleName).toBe('Francis');
            expect(nameParts.lastName).toBe('Rizzuto');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('The Scooter');
            expect(nameParts.hasSupplementalInfo).toBe(true);

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
        });

        it('should parse a name with multiple middle names', function() {
            var nameParts = parse('George Herbert Walker Bush');
            expect(nameParts.firstName).toBe('George');
            expect(nameParts.middleName).toBe('Herbert Walker');
            expect(nameParts.lastName).toBe('Bush');
        });

        it('should parse a name with a last name prefix of "Saint" or "St"', function() {
            var nameParts = parse('Michael St. James III');

            // Parse results
            expect(nameParts.firstName).toBe('Michael');
            expect(nameParts.lastName).toBe('St James');
            expect(nameParts.generation).toBe('III');

            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.suffix).toBeNull();
            expect(nameParts.aliases.length).toBe(0);

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasNonName).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(true);
            expect(nameParts.hasSupplementalInfo).toBe(false);

            // Same test, but this time with "Saint" instead of "St"
            var nameParts = parse('Michael Saint James III');
            expect(nameParts.firstName).toBe('Michael');
            expect(nameParts.lastName).toBe('Saint James');
            expect(nameParts.generation).toBe('III');
        });

        xit('should parse a Saint\'s name', function() {
            var nameParts = parse('St. Francis of Assisi');

            // Parse results
            expect(nameParts.salutation).toBe('St');
            expect(nameParts.firstName).toBe('Francis');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases[0]).toBe('Assisi');

            // Members not used for this result
            expect(nameParts.lastName).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.middleName).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        xit('should parse a name with extraneous information', function() {
            //John Doe fictitious husband of Jane Doe
        });

        xit('should parse a name an Arabic name', function() {
            var nameParts = parse('Saleh ibn Tariq ibn Khalid al-Fulan');
            expect(nameParts.firstName).toBe('Saleh');
            // expect(nameParts.childOf[0]).toBe('Tariq'); // TODO: needs to be implemented
            // expect(nameParts.childOf[0]).toBe('Khalid'); // TODO: needs to be implemented
            expect(nameParts.lastName).toBe('Fulan'); // or is it "al-Fulan"?

            // Notes
            // ibn, bin, bint = "son of"
            // ibnat, bint, bte. = "daughter of"
            // abu = "father of"
            // umm = "mother of"
        });

        it('Should handle unterminated quotes in a name', function() {
            var nameParts = parse('John \'o Doe');
            expect(nameParts.firstName).toBe('John');
            expect(nameParts.lastName).toBe('\'o Doe');
        });

        it('should parse a name with a middle name then alias afterwards', function() {
            var nameParts = parse('Neil Patrick "NPH" Harris');

            // Parse results
            expect(nameParts.fullName).toBe('Neil Patrick "NPH" Harris');
            expect(nameParts.firstName).toBe('Neil');
            expect(nameParts.middleName).toBe('Patrick');
            expect(nameParts.lastName).toBe('Harris');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases.length).toBe(1);
            expect(nameParts.aliases[0]).toBe('NPH');


            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        it('should parse a name with an alias then middle name afterwards', function() {
            var nameParts = parse('Neil "NPH" Patrick Harris');

            // Parse results
            expect(nameParts.fullName).toBe('Neil "NPH" Patrick Harris');
            expect(nameParts.firstName).toBe('Neil');
            expect(nameParts.middleName).toBe('Patrick');
            expect(nameParts.lastName).toBe('Harris');
            expect(nameParts.hasNonName).toBe(true);
            expect(nameParts.aliases.length).toBe(1);
            expect(nameParts.aliases[0]).toBe('NPH');


            // Members not used for this result
            expect(nameParts.salutation).toBeNull();
            expect(nameParts.generation).toBeNull();
            expect(nameParts.suffix).toBeNull();

            // Flags
            expect(nameParts.hasCorporateEntity).toBe(false);
            expect(nameParts.hasLnPrefix).toBe(false);
            expect(nameParts.hasSupplementalInfo).toBe(false);
        });

        // GitHub Issue #5
        it('should handle incorrect spacing with quotes', function() {
            var nameParts = parse('Quotes "And"Ã¢â‚¬â€¹ Spaces');
            expect(nameParts.firstName).toBe('Quotes');
            expect(nameParts.lastName).toBe('Spaces');
            expect(nameParts.aliases.length).toBe(1);
            expect(nameParts.aliases[0]).toBe('And');
        });

        // GitHub Issue #6
        it('should handle an unterminated double quote in a name', function() {
            var nameParts = parse('John P. "Typo Doe Sr.');
            expect(nameParts.firstName).toBe('John');
            expect(nameParts.middleName).toBe('P');
            expect(nameParts.aliases.length).toBe(1);
            expect(nameParts.aliases[0]).toBe('Typo');
            expect(nameParts.lastName).toBe('Doe');
            expect(nameParts.generation).toBe('Sr');
        });
    });
});
