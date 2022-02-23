$(function () {
	$.get("/sites")
		.then((sites) => {
			populateSelection(sites);
			$('[data-role="insert"]').show();
			$('[data-role="update"]').hide();
			$('[data-role="delete"]').hide();
		})
		.catch((e) => console.warn(e));

	$("#sites-list").change(() => {
		if ($("#sites-list option:selected").val() !== "Insert new") {
			$('[data-role="insert"]').hide();
			$('[data-role="update"]').show();
			$('[data-role="delete"]').show();
			let id = $("#sites-list option:selected").val();
			$.get(`/sites/${id}`).then((site) => {
				fillAllFields(site);
			});
		} else {
			$('[data-role="insert"]').show();
			$('[data-role="update"]').hide();
			$('[data-role="delete"]').hide();
			emptyFields();
		}
	});
	const populateSelection = (sites) => {
		$("#sites-list").empty();
		$("#sites-list").append($("<option>").html("Insert new"));
		$.each(sites, (_, site) => {
			$("#sites-list").append($("<option>").val(site._id).html(site.siteName));
		});
	};
	$('[data-role="insert"]').click(() => {
		const { siteName, siteURL, siteSelector } = getData();
		$.post("/sites", { siteName, siteURL, siteSelector }, (site) => emptyFields());
		$.get("/sites").then((sites) => {
			populateSelection(sites);
		});
	});
	const getData = () => {
		return {
			siteName: $('[data-role="siteName"]').val(),
			siteURL: $('[data-role="siteURL"]').val(),
			siteSelector: $('[data-role="siteSelector"]').val(),
		};
	};
	const fillAllFields = (site) => {
		$('[data-role="siteName"]').val(site.siteName);
		$('[data-role="siteURL"]').val(site.siteURL);
		$('[data-role="siteSelector"]').val(site.siteSelector);
		$('[data-role="parsedData"]').html(site.siteData);
	};
	const emptyFields = (site) => {
		$('[data-role="siteName"]').val("");
		$('[data-role="siteURL"]').val("https://www..com");
		$('[data-role="siteSelector"]').val("");
	};
	$('[data-role="update"]').click(() => {
		let id = $("#sites-list option:selected").val();
		$("#sites-list option:selected").val("Insert new");
		let { siteName, siteURL, siteSelector } = getData();
		$.ajax({
			type: "PUT",
			url: `/sites/${id}`,
			data: { siteName, siteURL, siteSelector },
			success: () => {
				$.get("/sites").then((sites) => {
					populateSelection(sites);
					emptyFields();
				});
			},
		});
	});

	$('[data-role="delete"]').click(() => {
		let id = $("#sites-list option:selected").val();
		$("#sites-list option:selected").val("Insert new");
		$.ajax({
			type: "DELETE",
			url: `/sites/${id}`,
			success: () => {
				$.get("/sites").then((sites) => {
					populateSelection(sites);
					emptyFields();
				});
			},
		});
	});
});
